/*!

    HesGallery ver 1.1.1 (23.02.2018r.)

    Copyright (c) 2018 Artur Medrygal (amedrygal@heseya.com)

    Product under CC BY-NC-ND 4.0 licence
    https://creativecommons.org/licenses/by-nc-nd/4.0/

*/

var HesGallery = {
    executed: false,
    current: 0,
};

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

    this.$img.attr('src',this.imgPaths[i]);
    this.$galery.addClass('open');

    $('#hg-pic-cont').attr('data-subtext', this.subTexts[i]);
    $('#hg-pic-cont').attr('data-howmany', this.current+'/'+this.ile);

    if(this.current == 1) {
        $('#hg-prev').addClass('hg-unvisible');
        $('#hg-prev-onpic').addClass('hg-unvisible');

        $('#hg-next').removeClass('hg-unvisible');
        $('#hg-next-onpic').removeClass('hg-unvisible');
    } else if (this.current == this.ile) {
        $('#hg-next').addClass('hg-unvisible');
        $('#hg-next-onpic').addClass('hg-unvisible');

        $('#hg-prev').removeClass('hg-unvisible');
        $('#hg-prev-onpic').removeClass('hg-unvisible');
    } else {
        $('#hg-next').removeClass('hg-unvisible');
        $('#hg-next-onpic').removeClass('hg-unvisible');

        $('#hg-prev').removeClass('hg-unvisible');
        $('#hg-prev-onpic').removeClass('hg-unvisible');
    }
}

HesGallery.hide = function() {
    this.$galery.removeClass('open');
}

HesGallery.next = function() {
    if(this.current < this.ile) this.show(this.current+1);
}

HesGallery.prev = function() {
    if(this.current > 1) this.show(this.current-1);
}

addEventListener('keydown', function(e){
    if(e.keyCode == 39) HesGallery.next();
    if(e.keyCode == 37) HesGallery.prev();
    if(e.keyCode == 27) HesGallery.hide();
});

onload = function() {
    HesGallery.init();
}
