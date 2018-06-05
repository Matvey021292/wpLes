var Form = new function () {

    /**
     * Метод инициализации Form
     * 
     * @returns {Form}
     */
    this.init = function () { 
        this.submit_count = 0;
        this.form_container = $('.form-container');
        this.country_input_val = ''; 
        this.messages = {
            "firstname": "- поле обязательно для заполнения<br>- длина имени - не менее 2 символов<br>- поле должно содержать только буквы",
            "lastname": "- поле обязательно для заполнения<br>- длина имени - не менее 2 символов<br>- поле должно содержать только буквы",
            "email": "- поле должно содержать правильный email-адрес",
            "phone": "- поле должно содержать корректный номер телефона",
            "conditions": "Пожалуйста, подтвердите ваше согласие с условиями",
            "success": "Ваша регистрация прошла успешно, поздравляем Вас! Ожидайте звонка в ближайшее время.",
            "error": "К сожалению, регистрация не прошла успешно",
            "limit": "К сожалению, лимит на отправку формы исчерпан",
            0: "Поздравляем с успешной регистрацией. Наш консультант свяжется с Вами в ближайшее время.",
            1: "Поздравляем с успешной регистрацией. Наш консультант свяжется с Вами в ближайшее время. Через несколько секунд Вы будете перенаправлены в личный кабинет.",
            2: "Ваш адрес электронной почты уже зарегистрирован в системе. Пожалуйста, попробуйте другой адрес.",
            3: "Поздравляем с успешной регистрацией. Наш консультант свяжется с Вами в ближайшее время.",
            4: "К сожалению, при регистрации произошла ошибка. Пожалуйста, попробуйте позже.",
            5: "К сожалению, при регистрации произошла ошибка. Пожалуйста, попробуйте позже.",
            6: "Поздравляем с успешной регистрацией. К сожалению, система в данный момент недоступна. Наш консультант свяжется с Вами в ближайшее время.",
            7: "К сожалению, введенные Вами данные не могут быть приняты системой. Попробуйте другие регистрационные данные."
        };
       
        this.initFormData();
        this.addUrlData();
        this.changeHistory();
        this.createNewWindow();

        return this;
    };

    /**
     * Метод инициализации елементов
     * 
     * @returns {void}
     */
    this.initElem = function () {

        this.main_modal = $(".main-modal");
        this.post_modal = $('#postModal');
        this.congrats_modal = $('.congrats');
        this.congrats_alert = $('.congrats-left__text');
        this.call_back_modal = $("#call_back_form");
        this.alert = $('#postModal .alert');
        this.closer = $('.close-form');
        this.affID = $('input[data-validation-type="affid"]');
        this.subID = $('input[data-validation-type="subid"]');
        this.offerID = $('input[data-validation-type="offerid"]');
        this.transID = $('input[data-validation-type="transactionid"]'); 
        this.waitWindow = $('.wait-window');
        this.password = $('input[name="password"]'); 

    }

    /**
     * Метод инициализации динамики
     * 
     * @returns {void}
     */
    this.initFormData = function () {

        this.getConfig();
        this.createForms();
        this.initElem();
        this.hideInputs();
        this.loadExternalTrackers();

    }

        /**
     * Метод инициализации загрузки страници
     * 
     * @returns {void}
     */
     this.DOMReady = function () {

        this.validationOnBlur();
        this.submitForm(); 
        this.initCountrySelect();
        this.password.val(this.generatePass(10));
        if(this.call_back_modal)
            this.initCallBack();
        this.fireExternalEvents('load');


    }

	/**
     * Метод инициализации call back окна
     * 
     * @returns {void}
     */
    this.initCallBack = function () {
        this.call_back_modal.find(".button--inner").html("Call Back"), idleTimer = null, idleState = !1, idleWait = 6e4,
                
        $("*").bind("mousemove keydown scroll", function() {
            clearTimeout(idleTimer), idleState = !1, idleTimer = setTimeout(function() {
                $("body").ready(function() {
                    $(".main-modal").is(":visible") && $(".main-modal").modal('hide'), $("#call_back_popup").modal('show')
                }), idleState = !0
            }, idleWait)
        }), $("body").trigger("mousemove")        
            
    }

    /**
     * Метод обработки даный с config.json
     * 
     * @returns {void}
     */
    this.getConfig = function () {

        this.request = new XMLHttpRequest();
        this.request.open("GET", "config.js", false);
        this.request.send(null);
        this.config = JSON.parse(Form.request.response);

        this.forms = this.config['forms'];
        this.style = this.config['style'];
        this.template = this.config['main-template'];
        this.inputs = this.config['inputs-template'];
        this.modal = this.config['modal-template'];
        this.source_id = this.config['source-id'];
        this.registration = this.config['registration']; 
        this.iframe = this.config['iframe'];
        this.iframeTemplate = this.config['iframe-template'];
        this.externalTrackers = this.config['externalTrackers'];
        this.externalTrackerEvents = this.config['externalTrackerEvents'];
        this.preloaderTemplate = this.config['preloader-template'];
        this.historyLinks = this.config['historyLinks'];
        this.backOffer = this.config['backOffer'];
        this.secondOffer = this.config['secondOffer'];
        this.land_name = this.config['land_name'];

        this.changeConfig();

    }

    /**
     * Метод замены config
     * 
     * @returns {void}
     */
     this.changeConfig = function () {
        if(this.urlParam('reg'))
            this.registration = this.urlParam('reg')
        if(this.urlParam('bf'))
            this.backOffer = this.urlParam('bf')
        if(this.urlParam('so'))
            this.secondOffer = this.urlParam('so')
    }

    /**
     * Метод изминения history
     * 
     * @returns {void}
     */
     this.changeHistory = function () {
        if(this.backOffer){
            window.history.pushState({link: window.location.href}, null, window.location.href)
            window.onpopstate = function(event) {
                var link = document.createElement('a');
                link.href = Form.backOffer;
                document.body.appendChild(link);
                link.click(); 
            };
        }
    }

    /**
     * Метод инициализации нового окна
     * 
     * @returns {void}
     */
    this.createNewWindow = function () {
        if(this.secondOffer){
            console.log(this.secondOffer)
            window.open(Form.secondOffer);
        }
    }

    /**
     * Метод создания html разметки
     * 
     * @returns {void}
     */
    this.createForms = function () {

        for( var input in this.inputs ){
            this.form_container.append(this.inputs[input]);
        }
        this.form_container.append('<style>' + this.style + '</style>', this.template);
        $('body').append(this.modal);

    }

    this.loadExternalTrackers = function () {
        for(var i = 0; i<= this.externalTrackers.length - 1; i++){
            if(this.externalTrackers[i].position === 'head'){
                $('head').append('<script>' + this.externalTrackers[i].code + '</script>')
            }else{
                $('body').append('<script>' + this.externalTrackers[i].code + '</script>')
            }
        }
    }

    this.fireExternalEvents = function (event) {
        for(var i = 0; i<= this.externalTrackerEvents.length - 1; i++){
            if(this.externalTrackerEvents[i].event === event){
                $('body').append('<script>' + this.externalTrackerEvents[i].code + '</script>')
            }
        }
    }

    /**
     * Метод скрытия ненужных полей
     * 
     * @returns {void}
     */
     this.hideInputs = function () {

        !this.config['modal'] ? this.closer.hide() : this.closer.show();

        for( var form in this.forms ){

            for( var param in this.forms[form].hidden ){
                $("#" + form).find('input[name=' + param +']').attr({
                    'type':'hidden',
                    'value': param !== 'country' ? this.forms[form].hidden[param] : ''
                }).siblings('label:not(#code-label)').hide();
                if(param === 'age'){
                    $("#" + form).find('input[name=age]').parent().hide()
                }else if(param === 'conditions'){
                    $("#" + form).find('input[name=conditions]').parent().hide()
                }
                
            }

            if(this.forms[form].hidden.hasOwnProperty('country')){ 
                    this.country_input_val = this.forms[form].hidden['country']; 
                } 

        }

    }

    /**
     * Метод парсинга URL
     *
     * @param {string} name
     * @returns {result}
     */
     this.urlParam = function (name, location) {
        var url
        if(location !== undefined){
            url = location
        }else{
            url = window.location.href
        }
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
        if (results !== null) {
            return results[1] || 0;
        } else {
            return false;
        }

    }

    /**
     * Метод генерации пароля
     *
     * @param {string} len
     * @returns {result}
     */
    this.generatePass = function (len) {

        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var pass = '';
        var charCount = 0;
        var numCount = 0;

        for (var i=0; i<len; i++) {

            if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
                var rnum = Math.floor(Math.random() * 10);
                pass += rnum;
                numCount += 1;
            } else {
                var rnum = Math.floor(Math.random() * chars.length);
                pass += chars.substring(rnum,rnum+1);
                charCount += 1;
            }
        }
        return pass;
                      
    };

    /**
     * Метод заменения backOffer и secondOffer с URL
     * 
     * @returns {void}
     */
     this.changeOffers = function (name, domain) {

        var arr = ['affiliate_id', 'aff_sub', 'offer_id', 'transaction_id'],
            newOffer = '';
        for(var i = 0; i<=arr.length - 1; i++){
            if(name.includes('{' + arr[i] + '}')){
                newOffer += arr[i] + '=' + this.urlParam(arr[i]) + '&'
            }
        }

        return domain + newOffer
    }

    /**
     * Метод парсинга URL и заполенения полей
     * 
     * @returns {void}
     */
     this.addUrlData = function () {

        if(this.backOffer){
            var backDomain = this.backOffer.split('?')[0] + '?';
            var newBackOffer = this.changeOffers(this.backOffer, backDomain);
            if(newBackOffer !== '')
                this.backOffer = newBackOffer
        }

        if(this.secondOffer){
            var secondDomain = this.secondOffer.split('?')[0] + '?';
            var newSecondOffer = this.changeOffers(this.secondOffer, backDomain);
            if(newSecondOffer !== '')
                this.secondOffer = newSecondOffer
        } 

        this.affID.val(this.urlParam('affiliate_id'));
        this.subID.val(this.urlParam('aff_sub'));
        this.offerID.val(this.urlParam('offer_id'));
        this.transID.val(this.urlParam('transaction_id'));
    }


    this.check_validation = function(target) {
        var $target = target;
            var validType = $target.data('validation-type');
            var val = $target.val();

            switch(validType)
            {
                case 'firstname':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;


                if(val.length > 2 && val != '' && rv_name.test(val))
                {
                    $target.addClass('valid');
                    $target.removeClass('invalid');
                    $target.next('.error').text('')
                }

                else
                {
                    $target.removeClass('valid').addClass('invalid');
                    $target.next('.error').html(Form.messages.firstname)
                }
                break;
                case 'lastname':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;


                if(val.length > 2 && val != '' && rv_name.test(val))
                {
                    $target.addClass('valid');
                    $target.removeClass('invalid');
                    $target.next('.error').text('')
                }

                else
                {
                    $target.removeClass('valid').addClass('invalid');
                    $target.next('.error').html(Form.messages.lastname)
                }
                break;


                case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if(val != '' && rv_email.test(val))
                {
                    $target.addClass('valid');
                    $target.removeClass('invalid');
                    $target.next('.error').text('')
                }
                else
                {
                    $target.removeClass('valid').addClass('invalid');
                    $target.next('.error').html(Form.messages.email)

                }
                break;

                case 'phone':
                var rv_name = /^([- _():=+]?\d[- _():=+]?){2,14}(\s*)?$/;
                
                    if ($target.intlTelInput("isValidNumber") && $.trim(val) && rv_name.test(val)) {
                        $target.addClass('valid');
                        $target.removeClass('invalid');
                        $target.parents('.form_input--group').find('.error').text('');
                    } else {
                        $target.removeClass('valid').addClass('invalid');
                        $target.parents('.form_input--group').find('.error').html(Form.messages.phone);
                    }

                break;

                case 'age':
                if( !$target.prop("checked") ){
                    $target.parent().siblings('.error').html(Form.messages.conditions);
                    $target.removeClass('valid').addClass('invalid');
                }else{
                    $target.parent().siblings('.error').text('');
                    $target.removeClass('invalid').addClass('valid');
                }
                break;

                case 'conditions':
                if( !$target.prop("checked") ){
                    $target.parent().siblings('.error').html(Form.messages.conditions);
                    $target.removeClass('valid').addClass('invalid');
                }else{
                    $target.parent().siblings('.error').text('');
                    $target.removeClass('invalid').addClass('valid');
                }
                break;

            }
        }

    /**
     * Метод инициализации валидации
     * 
     * @returns {void}
     */
    this.validationOnBlur = function () {

        this.form_container.find('input').blur( function(event){
            Form.check_validation($(event.target));
        });
    }

    this.registrationFrame = function (res, json) {
        setTimeout(function () {
            var url = res.message;
            var ifr = document.getElementById('iframe');
            ifr.src = url.replace("http:", "https:");
            ifr.onload = function(){
                window.location.replace("app.php?username="+json.first_name+" "+json.last_name+"&email="+json.email_address);
            };
        }, 5000)
    }

    this.registrationTrue = function (res, json) {
        if(res.code === 1){
            if(this.iframe){
                this.waitWindow.show()
                Form.alert.addClass('alert-success').text(Form.messages[res.code]);
                this.registrationFrame(res, json)       
            }else{
                this.waitWindow.show()
                Form.alert.addClass('alert-success').text(Form.messages[res.code]);
                setTimeout(function () { 
                    window.location.assign(res.message); 
                }, 5000)
            }
        }else{
            Form.alert.addClass('alert-success').text(Form.messages[res.code]);
        }

    }

    /**
     * Метод инициализации отпарвки формы
     * 
     * @returns {void}
     */
    this.submitForm = function () {

        this.form_container.submit(function(e){
            e.preventDefault();

            Form.check_validation($(this).find('input').not(".valid").not(":hidden"));

            var countryData = $("input[name=phone]").intlTelInput("getSelectedCountryData");
            var json = {
                first_name: $(this).find('input[data-validation-type="firstname"]').val(),
                last_name: $(this).find('input[data-validation-type="lastname"]').val(),
                email_address: $(this).find('input[data-validation-type="email"]').val(),
                phone:  '+' + countryData.dialCode + $(this).find('input[data-validation-type="phone"]').val(),
                countryISO: countryData.iso2,
                affiliate_id: $(this).find('input[data-validation-type="affid"]').val(),
                aff_sub: $(this).find('input[data-validation-type="subid"]').val(),
                offer_id: $(this).find('input[data-validation-type="offerid"]').val(),
                transaction_id: $(this).find('input[data-validation-type="transactionid"]').val(),
                land_name: Form.land_name,
                source_id: Form.source_id,
                registration: Form.registration,
				password: Form.password.val()
            };

            if(Form.submit_count < 3){

                if(!$(this).find('.invalid').length && ($(this).find('.valid').length == $(this).find('input:not(:hidden)').length)){

                    $.post('https://moneytrack.pro/sendForm', JSON.stringify(json), function (response) {

                        try{
                            var r = JSON.parse(response);
                            if(Form.registration){
                                Form.registrationTrue(r, json)
                                congrats();
                            }else{
                                Form.congrats_alert.html(Form.messages[r.code]);
                                congrats();
                            }
                            Form.fireExternalEvents('registration')
                        }catch(err){
                            Form.alert.addClass('alert-danger').text(Form.messages.error);
                            setTimeout(function () {
                                Form.post_modal.modal('show');
                            }, 500);
                        }
                        Form.main_modal ? Form.main_modal.modal('hide') : "";
                        Form.submit_count++;

                    }).fail(function(res) {
                        try{
                            var r = JSON.parse(res.responseJSON)
                            Form.alert.addClass('alert-danger').text(Form.messages[r.code]);
                        }catch(err){
                            Form.alert.addClass('alert-danger').text(Form.messages.error);
                        }
                        Form.main_modal ? Form.main_modal.modal('hide') : "";
                        setTimeout(function () {
                            Form.post_modal.modal('show');
                        }, 500)

                    });
                }else{
                    return false;
                }

            }else{

                Form.alert.addClass('alert-danger').text(Form.messages.limit);
                Form.main_modal ? Form.main_modal.modal('hide') : "";
                setTimeout(function () {
                    Form.post_modal.modal('show');
                }, 500)
            }

        });
    }

    /**
     * Метод инициализации country select
     * 
     * @returns {Form}
     */
    this.initCountrySelect = function () {

        var telInput = $("input[name=phone]");
        telInput.intlTelInput({
            initialCountry: "ru",
            autoHideDialCode: "false",
            separateDialCode: "false"
        });

        if(this.country_input_val === ''){
            $.post('https://moneymake.me/geoip/',  function (response) {
                this.country_input_val = response.toLowerCase();
                telInput.intlTelInput("setCountry", this.country_input_val);
            })
            .fail(function (r) {
                console.log(r);
            });
        }else{
            telInput.intlTelInput("setCountry", this.country_input_val);
        }

    }

}

Form.init();
$(document).ready(function(){
    Form.DOMReady();
});
