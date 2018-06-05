var preloaderWrapper = document.querySelector(".preloader"),
    preloader = document.getElementById("preloader"),
    candleItems = document.querySelectorAll(".candle"),
    candleBodyAll = document.querySelectorAll(".candle-body"),
    data = {
        background_color: "#00cc8a",
        background_color_down: "red",
        interval: 70
    };

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

(function setUpValues() {
    for (var i = 0; i < candleItems.length; i++) {
        var ch = randomInteger(8, 60 - i);
        var ct = randomInteger(5, (i - ch - 20));
        var cbh = randomInteger(9, ch);
        var cbt = randomInteger(1, ch - cbh - 1);

        candleItems[i].setAttribute("style", "height: "
            + ch + "px; "
            + "top: " + (55 + ct) + "px;");
        candleBodyAll[i].setAttribute("style",
            "height: " + cbh + "px; "
            + "top: " + Number(cbt) + "px;"
            + "background-color: " + data.background_color + ";"
        );
    }

    for (var i = 0; i < candleItems.length - 1; i++) {
        var prevElement = candleItems[i].querySelector(".candle-body"),
            Element = candleItems[i + 1].querySelector(".candle-body"),
            prevElementTop = getCoords(prevElement),
            ElementTop = getCoords(Element);
        var candleStyle = Element.style;

        if (prevElementTop.top < ElementTop.top) {
            candleStyle.backgroundColor = data.background_color_down;
        } else {
            candleStyle.backgroundColor = data.background_color;
        }
    }
})();

function preloaderAnimation() {
    var firstCandleChild = preloader.firstElementChild;
    setTimeout(function () {
        preloader.insertAdjacentElement("beforeend", firstCandleChild);
    }, data.interval);

}

if (preloaderWrapper.length !== 0) {
    init = setInterval(function () {
        preloaderAnimation();
    }, 0);
}

// setTimeout(function () {
//     preloaderWrapper.style.opacity = 0;
//     setTimeout(function () {
//     preloaderWrapper.remove();
//     clearInterval(init);
//     }, 1000);
// }, 2000);