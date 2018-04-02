/*!

    HesGallery ver 1.3.2 (02.04.2018r.)

    Copyright (c) 2018 Artur Medrygal (amedrygal@heseya.com)

    Product under CC BY-NC-ND 4.0 licence
    https://creativecommons.org/licenses/by-nc-nd/4.0/

*/

var HesGallery = {
    options: { // Opcje domyślne
        wrapAround: false,
        disableScrolling: false,
        showImageCount: true,
        hostedStyles: true
    }
}

function HesSingleGallery(index) {
    this.index = index;
    this.imgPaths = []; // ścieżki do plików
    this.subTexts = []; // podpis pod zdjęciem
    this.altTexts = []; // atrybut alt

    this.count = document.querySelectorAll('.hes-gallery:nth-of-type('+this.index+') img').length; // liczba zdjęć w galerii

    for(var i = 0; i< this.count; i++) {
        this.imgPaths[i] = document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+(i+1)+')').src || '';
        this.subTexts[i] = document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+(i+1)+')').dataset.subtext || '';
        this.altTexts[i] = document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+(i+1)+')').dataset.alt || '';

        document.querySelector('.hes-gallery:nth-of-type('+this.index+') img:nth-of-type('+(i+1)+')').setAttribute('onclick', 'HesGallery.show('+(this.index-1)+','+i+')');
    }
}

HesGallery.setOptions = function(values) {
    for(var key in values) this.options[key] = values[key];
}

HesGallery.init = function() {
    if(!this.executed) { // Tworzenie elementow gallerii
        this.EOM = {};

        if(this.options.hostedStyles) document.head.innerHTML += "<link rel='stylesheet' href='https://api.heseya.com/hesgallery/hes-gallery.min.css'>";

        document.body.innerHTML += "<div id='hgallery' style='visibility:hidden;'></div>";
        this.EOM.galery = document.getElementById('hgallery'); // Cała galeria

        this.EOM.galery.innerHTML += "<div id='hg-bg' onclick='HesGallery.hide()'></div>";
        this.EOM.galery.innerHTML += "<div id='hg-pic-cont'><img id='hg-pic' /></div>";

        this.EOM.galery.innerHTML += "<button id='hg-prev' onclick='HesGallery.prev()'></button>";
        this.EOM.galery.innerHTML += "<button id='hg-next' onclick='HesGallery.next()'></button>";

        this.EOM.b_prev = document.getElementById('hg-prev');
        this.EOM.b_next = document.getElementById('hg-next');

        this.EOM.pic_cont = document.getElementById('hg-pic-cont');

        this.EOM.pic_cont.innerHTML += "<div id='hg-prev-onpic' onclick='HesGallery.prev()'></div>";
        this.EOM.pic_cont.innerHTML += "<div id='hg-next-onpic' onclick='HesGallery.next()'></div>";

        this.EOM.b_next_onpic = document.getElementById('hg-next-onpic');
        this.EOM.b_prev_onpic = document.getElementById('hg-prev-onpic');

        this.executed = true;
    }
    
    this.count = document.querySelectorAll('.hes-gallery').length; // ilość galerii
    
    this.galleries = [];
    
    for(var i = 0; i<this.count; i++) { // tworzenie galerii
        this.galleries[i] = new HesSingleGallery(i+1);
    }
    
    return 'HesGallery initiated!';
}

HesGallery.show = function(g,i) {
    this.currentImg = i;
    this.currentGal = g;

    this.open = true;

    document.getElementById('hg-pic').setAttribute('src', this.galleries[g].imgPaths[i]); // ustawia ścieżke do zdjęcia

    document.getElementById('hg-pic').alt = this.galleries[g].altTexts[i]; // ustawia atrybut alt

    this.EOM.galery.classList = 'open';

    this.EOM.pic_cont.dataset.subtext = this.galleries[g].subTexts[i];

    if(this.options.showImageCount) this.EOM.pic_cont.dataset.howmany =  (this.currentImg+1)+'/'+this.galleries[g].count;
    else  this.EOM.pic_cont.dataset.howmany = '';

    // Zarządzanie widocznością przycisków przewijania
    if(this.currentImg+1 == 1 && !this.options.wrapAround) { //Pierwsze zdjęcie
        this.EOM.b_prev.classList = 'hg-unvisible';
        this.EOM.b_prev_onpic.classList = 'hg-unvisible';

        this.EOM.b_next.classList = '';
        this.EOM.b_next_onpic.classList = '';

    }
    else if (this.currentImg+1 == this.galleries[this.currentGal].count && !this.options.wrapAround) { //Ostatnie zdjęcie
        this.EOM.b_next.classList = 'hg-unvisible';
        this.EOM.b_next_onpic.classList = 'hg-unvisible';

        this.EOM.b_prev.classList = '';
        this.EOM.b_prev_onpic.classList = '';

    }
    else if(!this.options.wrapAround) { //Dowolne zdjęcie
        this.EOM.b_next.classList = '';
        this.EOM.b_next_onpic.classList = '';

        this.EOM.b_prev.classList = '';
        this.EOM.b_prev_onpic.classList = '';
    }

    if(this.options.disableScrolling) document.body.classList += ' hg-disable-scrolling'; // Wyłącza scrollowanie
}

HesGallery.hide = function() {
    this.EOM.galery.classList='';
    this.open = false;
    if(this.options.disableScrolling) document.body.classList.remove('hg-disable-scrolling'); // Włącza scrollowanie
}

HesGallery.next = function() {
    if(this.options.wrapAround && this.currentImg == this.galleries[this.currentGal].count)
        this.show(this.currentGal, 1);
    else if(this.currentImg+1 < this.galleries[this.currentGal].count)
        this.show(this.currentGal, this.currentImg+1);
}

HesGallery.prev = function() {
    if(this.options.wrapAround && this.currentImg == 1)
        this.show(this.currentGal, this.galleries[this.currentGal].count);
    else if(this.currentImg+1 > 1)
        this.show(this.currentGal, this.currentImg-1);
}

addEventListener('keydown', function(e){
    if(e.keyCode == 39 && HesGallery.open) HesGallery.next();
    if(e.keyCode == 37 && HesGallery.open) HesGallery.prev();
    if(e.keyCode == 27 && HesGallery.open) HesGallery.hide();
});

onload = function() {
    HesGallery.init();
}
