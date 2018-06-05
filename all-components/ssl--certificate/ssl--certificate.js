var user = detect.parse(navigator.userAgent);
var ssl_block = $(".ssl");
console.log("Family: " + user.browser.family + " Name: " + user.browser.name);

$(document).ready(function () {
    if(user.browser.name == "Chrome 65") {
        ssl_block.addClass("chrome");
    }else if (user.browser.family == "Firefox"){
        ssl_block.removeClass("chrome").addClass("firefox");
    }else if (user.browser.family == "IE") {
        ssl_block.removeClass("chrome firefox").addClass("ie");
    }else if (user.browser.family == "Opera") {
        ssl_block.removeClass("chrome firefox ie").addClass("opera");
    }else if (user.browser.family == "Safari" || user.browser.family == "Mobile Safari") {
        ssl_block.removeClass("chrome firefox ie opera").addClass("safari");
    }else if (user.os.family == "Android") {
        ssl_block.removeClass("chrome firefox ie opera safari").addClass("android");
    }else if (user.browser.name == "Chrome 63") {
        ssl_block.removeClass("chrome firefox ie opera safari android").addClass("yandex");
    }
});