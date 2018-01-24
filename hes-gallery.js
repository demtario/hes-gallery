
let HesGalery = {
    executed: false,
    current: 0,
};

HesGalery.init = function() {
    if(!this.executed) {
        $("<div id='hgalery'></div>").appendTo('body');
        $("<div id='hg-bg' onclick='HesGalery.hide()'></div>").appendTo('#hgalery');
        $("<div id='hg-pic-cont'><img id='hg-pic' /></div>").appendTo('#hgalery');
        $("<button id='hg-prev' onclick='HesGalery.prev()'></button>").appendTo('#hgalery');
        $("<button id='hg-next' onclick='HesGalery.next()'></button>").appendTo('#hgalery');
        this.executed = true;
    }
    
    this.$img = $('#hg-pic'); // <img>
    this.$galery = $('#hgalery'); // Cała galeria
    
    this.ile = $('.hes-galery img').length; // ilość elementów galerii
    
    this.imgPaths = []; // ścieżki do plików
    
    for(let i = 1; i<= this.ile; i++) {
        this.imgPaths[i] = $('.hes-galery img:nth-of-type('+i+')').attr('src');
    }
    
}

HesGalery.show = function(i) {
    this.$img.attr('src',this.imgPaths[i]);
    this.$galery.addClass('open');
    this.current = i;
}

HesGalery.hide = function() {
    this.$galery.removeClass('open');
}

HesGalery.next = function() {
    if(this.current < this.ile) this.show(this.current+1);
}

HesGalery.prev = function() {
    if(this.current > 1) this.show(this.current-1);
}

addEventListener('keydown', function(e){
    if(e.keyCode == 39) HesGalery.next();
    if(e.keyCode == 37) HesGalery.prev();
    if(e.keyCode == 27) HesGalery.hide();
});

onload = function() {
    HesGalery.init();
}


