/*!

    HesGallery ver 1.4.4 (04.08.2018r.)

    Copyright (c) 2018 Artur Medrygal (medrygal.artur@gmail.com)

    Product under MIT licence

*/

let HesGallery = {
    options: { // Opcje domyślne

        // Globalne
        disableScrolling: false,
        hostedStyles: true,
        animations: true,
        keyboardControl: true,
        minResolution: 0,

        //Lokalne
        wrapAround: false,
        showImageCount: true
    },
    version: '1.4.4'
}

function HesSingleGallery(index) {
    this.index = index;
    this.imgPaths = []; // ścieżki do plików
    this.subTexts = []; // podpis pod zdjęciem
    this.altTexts = []; // atrybut alt

    this.options = {};

    let gallery = document.getElementsByClassName('hes-gallery')[this.index]

    this.options.wrapAround = typeof gallery.dataset.wrap == 'undefined' ? HesGallery.options.wrapAround : gallery.dataset.wrap == 'true';
    this.options.showImageCount = typeof gallery.dataset.imgCount == 'undefined' ? HesGallery.options.showImageCount : gallery.dataset.imgCount == 'true';

    let disabledCount = 0;
    [].forEach.call(gallery.getElementsByTagName('img'), function (image, i) {
        if(image.dataset.disabled == 'true') disabledCount++
        else {

            if(image.dataset.fullsize != null) this.imgPaths.push(image.dataset.fullsize || '')
            else this.imgPaths.push(image.src || '')
            this.subTexts.push(image.dataset.subtext || '')
            this.altTexts.push(image.dataset.alt || '')
    
            image.setAttribute('onclick', 'HesGallery.show('+(this.index)+','+(i - disabledCount)+')');
        }
    }.bind(this));

    this.count = this.imgPaths.length;
}

HesGallery.setOptions = function(values) {
    for(let key in values) this.options[key] = values[key];
}

HesGallery.init = function() {
    if(!this.executed) { // Tworzenie elementow gallerii
        this.EOM = {};

        if(this.options.hostedStyles) document.head.innerHTML += "<link rel='stylesheet' href='https://api.heseya.com/hesgallery/hes-gallery.min.css'>";

        const gal = document.createElement('div')
        gal.id = "hgallery"
        gal.setAttribute('style', 'visibility:hidden;')
        document.body.appendChild(gal)

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
    
    if(this.options.animations) this.EOM.pic_cont.classList = 'hg-transition';
    else this.EOM.pic_cont.classList = '';

    this.count = document.querySelectorAll('.hes-gallery').length; // ilość galerii
    
    this.galleries = [];
    
    for(let i = 0; i<this.count; i++) { // tworzenie galerii
        this.galleries[i] = new HesSingleGallery(i);
    }
    
    if(this.options.keyboardContol) {
        addEventListener('keydown', function(e){
            if(e.keyCode == 39 && HesGallery.open) HesGallery.next();
            if(e.keyCode == 37 && HesGallery.open) HesGallery.prev();
            if(e.keyCode == 27 && HesGallery.open) HesGallery.hide();
        })
    }

    return 'HesGallery initiated!';
}

HesGallery.show = function(g,i) {
    if(innerWidth < this.options.minResolution) return false; //Galleria off dla danej rozdziałki

    this.currentImg = i;
    this.currentGal = g;

    this.open = true;

    if(this.options.animations || this.EOM.pic_cont.classList=='hg-transition') this.EOM.pic_cont.classList.remove('hg-transition');

    document.getElementById('hg-pic').setAttribute('src', this.galleries[g].imgPaths[i]); // ustawia ścieżke do zdjęcia

    document.getElementById('hg-pic').alt = this.galleries[g].altTexts[i]; // ustawia atrybut alt

    this.EOM.galery.classList = 'open';

    this.EOM.pic_cont.dataset.subtext = this.galleries[g].subTexts[i];

    if(
        this.galleries[this.currentGal].options.showImageCount &&
        this.galleries[this.currentGal].imgPaths.length != 1
    ) this.EOM.pic_cont.dataset.howmany =  (this.currentImg+1)+'/'+this.galleries[g].count;
    else  this.EOM.pic_cont.dataset.howmany = '';

    // Zarządzanie widocznością przycisków przewijania
    if(this.galleries[this.currentGal].imgPaths.length == 1) { //Jedno zdjęcie w gallerii
        this.EOM.b_prev.classList = 'hg-unvisible';
        this.EOM.b_prev_onpic.classList = 'hg-unvisible';
        this.EOM.b_next.classList = 'hg-unvisible';
        this.EOM.b_next_onpic.classList = 'hg-unvisible';
    }
    else if(this.currentImg+1 == 1 && !this.galleries[this.currentGal].options.wrapAround) { //Pierwsze zdjęcie
        this.EOM.b_prev.classList = 'hg-unvisible';
        this.EOM.b_prev_onpic.classList = 'hg-unvisible';

        this.EOM.b_next.classList = '';
        this.EOM.b_next_onpic.classList = '';

    }
    else if (this.currentImg+1 == this.galleries[this.currentGal].count && !this.galleries[this.currentGal].options.wrapAround) { //Ostatnie zdjęcie
        this.EOM.b_next.classList = 'hg-unvisible';
        this.EOM.b_next_onpic.classList = 'hg-unvisible';

        this.EOM.b_prev.classList = '';
        this.EOM.b_prev_onpic.classList = '';

    }
    else { //Dowolne zdjęcie
        this.EOM.b_next.classList = '';
        this.EOM.b_next_onpic.classList = '';

        this.EOM.b_prev.classList = '';
        this.EOM.b_prev_onpic.classList = '';
    }

    if(this.options.disableScrolling) document.body.classList += ' hg-disable-scrolling'; // Wyłącza scrollowanie
}

HesGallery.hide = function() {
    if(this.options.animations) this.EOM.pic_cont.classList.add('hg-transition');

    this.EOM.galery.classList='';
    this.open = false;
    if(this.options.disableScrolling) document.body.classList.remove('hg-disable-scrolling'); // Włącza scrollowanie
}

HesGallery.next = function() {
    if(this.galleries[this.currentGal].options.wrapAround && this.currentImg == this.galleries[this.currentGal].count-1)
        this.show(this.currentGal, 0);
    else if(this.currentImg+1 < this.galleries[this.currentGal].count)
        this.show(this.currentGal, this.currentImg+1);
}

HesGallery.prev = function() {
    if(this.galleries[this.currentGal].options.wrapAround && this.currentImg == 0)
        this.show(this.currentGal, this.galleries[this.currentGal].count-1);
    else if(this.currentImg+1 > 1)
        this.show(this.currentGal, this.currentImg-1);
}

onload = function() {
    HesGallery.init();
}
