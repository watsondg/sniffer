'use strict';

var dashify = require('dashify');

module.exports = new Sniffer();

function Sniffer() {
    var ua = navigator.userAgent.toLowerCase();
    var av = navigator.appVersion.toLowerCase();
    var isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
    var isIE = av.indexOf('msie') > -1 || isIE11 || av.indexOf('edge') > -1;
    var isDroid = (/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i).test(ua);
    var isIos = (/ip(hone|od|ad)/i).test(ua) && !window.MSStream;
    var isDroidTablet = !isDroid && (/android/i).test(ua);
    var isPhone = isDroid || isIos;
    var isTablet = (isDroidTablet || (/ipad/i).test(ua)) && !window.MSStream;
    var isFirefox = ua.indexOf('firefox') > -1;
    var isSafari = !!ua.match(/version\/[\d\.]+.*safari/);

    this.infos = {
        isDroid: isDroid,
        isDroidTablet: isDroidTablet,
        isIos: isIos,
        isIE: isIE,
        isIE11: isIE11,
        isPhone: isPhone,
        isTablet: isTablet,
        isFirefox: isFirefox,
        isSafari: isSafari,
        isDesktop: !isPhone && !isTablet
    };

    Object.keys(this.infos).forEach(function(info) {
        Object.defineProperty(this, info, {
            get: function () {
                return this.infos[info];
            }
        });
    }, this);

    Object.freeze(this);

    // TODO: add getVersion() to get IE/Safari/... version
}

Sniffer.prototype.addClasses = function(el) {
    Object.keys(this.infos).forEach(function(info) {
        if (this.infos[info]) addClass(el, dashify(info));
    }, this);
};

Sniffer.prototype.getInfos = function() {
    return clone(this.infos);
};

function addClass(el, className) {
    if (el.addClass) el.addClass(className);
    else if (el.classList) el.classList.add(className);
    else el.className += ' ' + className;
}

function clone(source) {
    return JSON.parse(JSON.stringify(source));
}