var scene = document.getElementById('parallax');
var parallaxInstance = new Parallax(scene);

function congrats() {

    $('.congrats').fadeIn(200);

    $('.congrats-right__item-1 img').fadeIn().css('transform', 'scale(1)');

    setTimeout(function() {
        $('.congrats-right__item-2 img').fadeIn(750);
    }, 750);

    setTimeout(function() {
        $('.congrats-right__item-3 img').fadeIn(750);

        setTimeout(function() {
            $('.congrats-right__item-3 img').css('animation', 'shake .75s linear');
        }, 500);

    }, 1250);

    $('.congrats-left__title, .congrats-left__text').slideDown(1200);

    setTimeout(function () {
        $('.preloader').show(700);
    }, 1000);

    $('.congrats__close').slideDown(1000);
}

$(document).ready(function () {
    $('.congrats__close').click(function () {
        $('.congrats').fadeOut(200);
    });
});