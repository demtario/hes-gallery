/*!

    HesGallery ver 1.2.0 (31.03.2018r.)

    Copyright (c) 2018 Artur Medrygal (amedrygal@heseya.com)

    Product under CC BY-NC-ND 4.0 licence
    https://creativecommons.org/licenses/by-nc-nd/4.0/

*/

var HesGallery = {
    executed: false,
    current: 0,
    open: false,
    options: {
        wrapAround: false,
        disableScrolling: false,
        showImageCount: true
    }
};

HesGallery.setOptions = function(values) {
    for(var key in values) this.options[key] = values[key];
}

HesGallery.init = function() {
    if(!this.executed) {
        $("<link rel='stylesheet' href='https://api.heseya.com/hesgallery/hes-gallery.min.css'>").appendTo('head');

        $("<div id='hgallery' style='visibility:hidden;'></div>").appendTo('body');
        $("<div id='hg-bg' onclick='HesGallery.hide()'></div>").appendTo('#hgallery');
        $("<div id='hg-pic-cont'><img id='hg-pic' /></div>").appendTo('#hgallery');

        $("<button id='hg-prev' onclick='HesGallery.prev()'></button>").appendTo('#hgallery');
        $("<button id='hg-next' onclick='HesGallery.next()'></button>").appendTo('#hgallery');

        $("<div id='hg-prev-onpic' onclick='HesGallery.prev()'></div>").appendTo('#hg-pic-cont');
        $("<div id='hg-next-onpic' onclick='HesGallery.next()'></div>").appendTo('#hg-pic-cont');

        this.executed = true;
    }
    
    this.count = $('.hes-gallery').length; // ilość galerii (roboczo)

    this.$img = $('#hg-pic'); // <img>
    this.$galery = $('#hgallery'); // Cała galeria
    
    this.ile = $('.hes-gallery img').length; // ilość elementów galerii
    
    this.imgPaths = []; // ścieżki do plików
    this.subTexts = []; //podpis pod zdjęciem
    
    for(var i = 1; i<= this.ile; i++) {
        this.imgPaths[i] = $('.hes-gallery img:nth-of-type('+i+')').attr('src');
        this.subTexts[i] = $('.hes-gallery img:nth-of-type('+i+')').attr('data-subtext');

        $('.hes-gallery img:nth-of-type('+i+')').attr('onclick','HesGallery.show('+i+')');
    }
    
}

HesGallery.show = function(i) {
    this.current = i;

    this.open = true;

    this.$img.attr('src',this.imgPaths[i]);
    this.$galery.addClass('open');

    $('#hg-pic-cont').attr('data-subtext', this.subTexts[i]);
    if(this.options.showImageCount) $('#hg-pic-cont').attr('data-howmany', this.current+'/'+this.ile);

    if(this.current == 1 && !this.options.wrapAround) {
        $('#hg-prev').addClass('hg-unvisible');
        $('#hg-prev-onpic').addClass('hg-unvisible');

        $('#hg-next').removeClass('hg-unvisible');
        $('#hg-next-onpic').removeClass('hg-unvisible');
    } else if (this.current == this.ile && !this.options.wrapAround) {
        $('#hg-next').addClass('hg-unvisible');
        $('#hg-next-onpic').addClass('hg-unvisible');

        $('#hg-prev').removeClass('hg-unvisible');
        $('#hg-prev-onpic').removeClass('hg-unvisible');
    } else if(!this.options.wrapAround) {
        $('#hg-next').removeClass('hg-unvisible');
        $('#hg-next-onpic').removeClass('hg-unvisible');

        $('#hg-prev').removeClass('hg-unvisible');
        $('#hg-prev-onpic').removeClass('hg-unvisible');
    }

    if(this.options.disableScrolling) $('body').addClass('hg-disable-scrolling'); // Wyłącza scrollowanie
}

HesGallery.hide = function() {
    this.$galery.removeClass('open');
    this.open = false;
    if(this.options.disableScrolling) $('body').removeClass('hg-disable-scrolling'); // Włącza scrollowanie
}

HesGallery.next = function() {
    if(this.options.wrapAround && this.current == this.ile) {

        this.show(1);

    } else {

        if(this.current < this.ile) this.show(this.current+1);

    }
}

HesGallery.prev = function() {
    if(this.options.wrapAround && this.current == 1) {

        this.show(this.ile);

    } else {

        if(this.current > 1) this.show(this.current-1);

    }
}

addEventListener('keydown', function(e){
    if(e.keyCode == 39 && HesGallery.open) HesGallery.next();
    if(e.keyCode == 37 && HesGallery.open) HesGallery.prev();
    if(e.keyCode == 27) HesGallery.hide();
});

onload = function() {
    HesGallery.init();
}
