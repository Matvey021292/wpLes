/**
 * Базовая настройка express сервера
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var serverConfig = require('./constructorConfig.js');
var config = require('./constructor/constructor.json');
var path = require('path');
var fsExtra = require('fs-extra');
var fs = require('fs');
var replace = require('replace');
var rimraf = require('rimraf');
var libs = [];

http.listen(serverConfig.web_port, function() {
    console.log('Server started ' + serverConfig.web_port + ' at ' +
        (new Date().toLocaleString().substr(0, 24)));
});

app.get('/ping', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', serverConfig.parentDomain);
    res.send("OK");
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/constructor/constructor.html');
});

// Маршрутизатор для статики
app.use(express.static(__dirname + '/constructor'));
app.use(express.static(__dirname + '/all-components'));

app.get('/sendForm', function(req, res) {
    libs = [];
    rimraf('src/js/form.js', (err) => {
        if (err) return console.error(err);
    });
    rimraf('src/components/*', (err) => {
        if (err) return console.error(err);

        req.query && req.query.components ?
            grnInfo(req.query.components) :
            console.warn('No query components')

    });

    res.end('go');

});

async function grnInfo(components) {
    let htmlInclude = "";
    let form = '';

    try {
        const streams = {
            sass: fs.createWriteStream('src/sass/_components.sass'),
            libss: fs.createWriteStream('src/sass/_constructorLibs.sass'),
            js: fs.createWriteStream('src/js/components.js'),
            libjs: fs.createWriteStream('src/js/constructorLibs.js')
        }

        for (const component of components) {
            const cfgComp = config[component];

            if (!cfgComp)
                throw new Error('Component not found in config! ' + component)

            await fsExtra.copy('all-components/' + cfgComp.name, 'src/components/' + cfgComp.name);

            let formSearch = false
            if(cfgComp.js){
                for(const item of cfgComp.js){
                    if(item.search('form.js') !== -1){
                        formSearch = true
                    }
                }
                if (formSearch) {
                    form = 'form';
                    await fsExtra.copy('all-components/' + cfgComp.name + '/form.js', 'src/js/form.js');
                }
            }

            if (cfgComp.html) {
                for (const htmlPart of cfgComp.html) {
                    htmlInclude += "@@include('" + htmlPart + "')\n";
                }
            }            

            if (cfgComp.libsJs) await editFile(cfgComp.libsJs, streams.libjs);
            if (cfgComp.libsSass) await editFile(cfgComp.libsSass, streams.libss);
            if (cfgComp.js) await editFile(cfgComp.js, streams.js, cfgComp.name);
            if (cfgComp.sass) await editFile(cfgComp.sass, streams.sass);

            console.log('Component ' + component + ' added successfully!');
        }

        for (const stream of Object.values(streams)) {
            await stream.end(err =>
                new Promise((resolve, reject) => err ? reject(err) : resolve()))
        }

    } catch (err) {
        return console.error(err);
    }

    fs.readFile('src/index.html', 'utf8', (err, data) => {
        if (err) throw err;

        var bodyPart = data.split('<body>');
        var script = bodyPart[1];
        var idx = script.split('</body>')[0].split('\n');
        var idxLength = idx.length - 1;

        while (idxLength >= 0) {

            if (idx[idxLength].indexOf('@@include') >= 0) {
                idx.shift(idxLength);
            } else if (idx[idxLength].indexOf('form.js') >= 0) {
                if (idx[idx.length - 1] === '') {
                    idx.pop();
                }
                idx.pop();
            }
            idxLength--;

        }

        let fileName;

        if (form === '') {
            fileName = bodyPart[0] + '<body>\n' + htmlInclude + idx.join('\n') + '</body>\n</html>';
        } else {
            idx.push('<script src="js/form.js"></script>');
            fileName = bodyPart[0] + '<body>\n' + htmlInclude + idx.join('\n') + '\n</body>\n</html>';
        }

        fs.writeFile('src/index.html', fileName,
            err => {
                if (err) logger.error(err);                
            });

    });

}

/*function editFile(files, stream) {
    return new Promise((resolve, reject) => {
        let importData = "";

        for (const file of files) {
            importData += `@import '${file}'\n`;
        }

        stream.write(importData, (err) => err ? reject(err) : resolve());

    })
}*/

function editFile(files, stream, name) {
    return new Promise((resolve, reject) => {
        let importData = "";

        for (const file of files) {
            if (!libs.includes(file) && !file.includes('form.js')) {
                importData += `@import '${file}'\n`;
                libs.push(file);

            }
               
        }

        stream.write(importData, err => err ? reject(err) : resolve());
    })
}