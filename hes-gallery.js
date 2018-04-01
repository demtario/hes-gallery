/*!

    HesGallery ver 1.3.0 (01.04.2018r.)

    Copyright (c) 2018 Artur Medrygal (amedrygal@heseya.com)

    Product under CC BY-NC-ND 4.0 licence
    https://creativecommons.org/licenses/by-nc-nd/4.0/

*/

var HesGallery = {
    executed: false,
    currentImg: 0,
    currentGal: 1,
    options: {
        wrapAround: false,
        disableScrolling: false,
        showImageCount: true,
        hostedStyles: true
    }
}

HesGallery.setOptions = function(values) {
    for(var key in values) this.options[key] = values[key];
}

HesGallery.init = function() {
    if(!this.executed) {
        if(this.options.hostedStyles) document.head.innerHTML += "<link rel='stylesheet' href='https://api.heseya.com/hesgallery/hes-gallery.min.css'>";

        document.body.innerHTML += "<div id='hgallery' style='visibility:hidden;'></div>";
        this.galery = document.getElementById('hgallery'); // Cała galeria

        this.galery.innerHTML += "<div id='hg-bg' onclick='HesGallery.hide()'></div>";
        this.galery.innerHTML += "<div id='hg-pic-cont'><img id='hg-pic' /></div>";

        this.galery.innerHTML += "<button id='hg-prev' onclick='HesGallery.prev()'></button>";
        this.galery.innerHTML += "<button id='hg-next' onclick='HesGallery.next()'></button>";

        this.b_prev = document.getElementById('hg-prev');
        this.b_next = document.getElementById('hg-next');

        this.pic_cont = document.getElementById('hg-pic-cont');

        this.pic_cont.innerHTML += "<div id='hg-prev-onpic' onclick='HesGallery.prev()'></div>";
        this.pic_cont.innerHTML += "<div id='hg-next-onpic' onclick='HesGallery.next()'></div>";

        this.b_next_onpic = document.getElementById('hg-next-onpic');
        this.b_prev_onpic = document.getElementById('hg-prev-onpic');

        this.executed = true;
    }
    
    this.count = document.querySelectorAll('.hes-gallery').length; // ilość galerii (roboczo)
    
    this.galleries = []; // Ilość galerii
    
    for(var i = 1; i<=this.count; i++) {
        this.galleries[i] = new HesSingleGallery(i);
    }
    
    return 'HesGallery initiated!';
}

class HesSingleGallery {
    constructor(i) {
        this.index = i;
        this.imgPaths = []; // ścieżki do plików
        this.subTexts = []; //podpis pod zdjęciem
        this.altTexts = [];

        this.count = document.querySelectorAll('.hes-gallery:nth-of-type('+this.index+') img').length;

        for(var i = 1; i<= this.count; i++) { //TU JEST BROKEN
            this.imgPaths[i] = document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+i+')').src;
            this.subTexts[i] = document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+i+')').dataset.subtext || '';
            this.altTexts[i] = document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+i+')').dataset.alt || '';

            document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+i+')').setAttribute('onclick', 'HesGallery.show('+this.index+','+i+')');
        }
    }
}

HesGallery.show = function(g,i) {
    this.currentImg = i;
    this.currentGal = g;

    this.open = true;

    document.getElementById('hg-pic').setAttribute('src', this.galleries[g].imgPaths[i]); // ustawia ścieżke do zdjęcia
    document.getElementById('hg-pic').alt = this.galleries[g].altTexts[i]; // ustawia atrybut alt

    console.log( HesGallery.img );

    this.galery.classList = 'open';

    this.pic_cont.dataset.subtext = this.galleries[g].subTexts[i];

    if(this.options.showImageCount) this.pic_cont.dataset.howmany =  this.currentImg+'/'+this.galleries[g].count;
    else  this.pic_cont.dataset.howmany = '';

    // Zarządzanie widocznością przycisków przewijania
    if(this.currentImg == 1 && !this.options.wrapAround) {
        this.b_prev.classList = 'hg-unvisible';
        this.b_prev_onpic.classList = 'hg-unvisible';

        this.b_next.classList = '';
        this.b_next_onpic.classList = '';
    } else if (this.currentImg == this.galleries[this.currentGal].count && !this.options.wrapAround) {
        this.b_next.classList = 'hg-unvisible';
        this.b_next_onpic.classList = 'hg-unvisible';

        this.b_prev.classList = '';
        this.b_prev_onpic.classList = '';
    } else if(!this.options.wrapAround) {
        this.b_next.classList = '';
        this.b_next_onpic.classList = '';

        this.b_prev.classList = '';
        this.b_prev_onpic.classList = '';
    }

    if(this.options.disableScrolling) document.body.classList += ' hg-disable-scrolling'; // Wyłącza scrollowanie
}

HesGallery.hide = function() {
    this.galery.classList='';
    this.open = false;
    if(this.options.disableScrolling) document.body.classList.remove('hg-disable-scrolling'); // Włącza scrollowanie
}

HesGallery.next = function() {
    if(this.options.wrapAround && this.currentImg == this.galleries[this.currentGal].count)
        this.show(this.currentGal, 1);
    else if(this.currentImg < this.galleries[this.currentGal].count)
        this.show(this.currentGal, this.currentImg+1);
}

HesGallery.prev = function() {
    if(this.options.wrapAround && this.currentImg == 1)
        this.show(this.currentGal, this.galleries[this.currentGal].count);
    else if(this.currentImg > 1)
        this.show(this.currentGal, this.currentImg-1);
}

addEventListener('keydown', function(e){
    if(e.keyCode == 39 && HesGallery.open) HesGallery.next();
    if(e.keyCode == 37 && HesGallery.open) HesGallery.prev();
    if(e.keyCode == 27) HesGallery.hide();
});

onload = function() {
    HesGallery.init();
}
