$(document).ready(function () {

    var videos = $('.video__item');

    videos.click(function () {
        var currentVideo = videos.index(this);

        for (i = 0; i < videos.length; i++) {
            if (i == currentVideo) {
                this.paused ? this.play() : this.pause();
                $(this.parentNode).toggleClass('active');
            } else {
                videos[i].pause();
                $(videos[i].parentNode).removeClass('active');

            }
        }

    });

    for (i = 0; i < videos.length; i++) {
        (function (x) {
            videos[x].addEventListener('ended', function () {
                this.pause();
                $(this.parentNode).removeClass('active');
                console.log(this.parentNode);
                videos[++x].play();
                $(videos[x].parentNode).addClass('active');
            })
        })(i);
    }
});