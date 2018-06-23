# HesGallery
Light, jQuery-free script creating a responsive gallery

*Full English translation soon*

## How to use?
Attach scripts to page
You can use a hosted version by hooking this script or import it locally by downloading a package of files, but remember to attach a CSS style sheet and disable the auto-hooking of styles in the options
```html
<script src="https://api.heseya.com/hesgallery/hes-gallery.min.js"></script>
```

For each container with photos that you want to use as a gallery, give the class: (Each container is a single gallery)
```css
.hes-gallery
```

You can modify the options of the gallery using function described below

## Sample gallery design
```html
<div class="hes-gallery">
    <img src="image1.jpg" alt="image1" data-subtext="Subtext" data-alt="Alternative text" />
    <img src="image2.jpg" alt="image2" data-subtext="Second subtext" />
    <img src="image3.jpg" alt="image3" data-subtext="Subtext" />
    <img src="image4.jpg" alt="image4" data-subtext="Subtext" />
</div>
```

## Global options
If you want, you can modify the gallery options to make it work better to you by using function `HesGallery.setOptions()`  
Sample:
```javascript
HesGallery.setOptions({
    wrapAround: true,
    disableScrolling: true
})
```

Parameter | Default | Description
---|---|---
`wrapAround` | *false* | Zapętla galerię, czyli będąc na ostatnim zdjęciu galerii i przechodząc do następnego trafimy do pierwszego i analogicznie w drugą stronę
`showImageCount` | *true* | Wyświetlanie numeru aktualnego zdjęcia i liczby wszystkich zdjęć (np. "1/5")
`disableScrolling` | *false* | Możliwość przewijania strony w momencie gdy uruchomiona jest galeria
`hostedStyles` | *true* | Automatycznie podpina arkusz styli ze źródłem na api.heseya.com (wyłącz jeśli chcesz umieścić hes-gallery na własnym serwerze)
`animations` | *true* | Animacje w trakcie korzystania z galerii
`keyboardControl` | *true* | Sterowanie klawiaturą w galeriach
`minResolution` | *0* | Minimalna szerokość ekranu dla której galeria będzie działać (w px)

## Options of single gallery
Jeśli zechcesz możesz nadać danemu zestawowi inne opcje dodając atrybuty do konterena z klasą `.hes-gallery`  
**Artubuty przyjmują tylko wartościu *true* lub *false*, w każdym innym przypadku galerią przyjmie wartości ustawione przez `HesGallery.setOptions()` lub domyślne!**
```html
<div class="hes-gallery" data-wrap="true" data-img-count='false' >
    <!-- Some <img> here -->
</div>
```
Available local options:  

Parameter | Global equivalent | Description
---|---|---
`data-wrap` | *wrapAround* | Zapętla galerię, czyli będąc na ostatnim zdjęciu galerii i przechodząc do następnego trafimy do pierwszego i analogicznie w drugą stronę
`data-img-count` | *showImageCount* | Wyświetlanie numeru aktualnego zdjęcia i liczby wszystkich zdjęć (np. "1/5")

## Available functions
Some of functions which you can use to manage the gallery

Function | Description
---|---
`HesGallery.init()` | Pozwala na przeładowanie galerii zdjęć, jeśli np. w międzyczasie dynamicznie zmieniła się zawartość pojemnika galerii to dzięki tej funckji można na nowo załadować zdjęcia do skryptu
`HesGallery.show(m, n)` | Wyświetla **n-te** zdjęcie z **m-tej** galerii
`HesGallery.next()` | Wyświetla następne zdjęcie względem obecnego
`HesGallery.prev()` | Wyświetla poprzednie zdjęcie względem obecnego
`HesGallery.hide()` | Ukrywa galerię
`HesGallery.setOptions()` | Pozwala na modyfikację opcji galerii (więcej wyżej)

## Img tag parameters
Parameter | Description
---|---
`data-subtext` | Tworzy podpis pod zdjęciem w galerii
`data-alt` | Ustawia atrybut alt obrazka wyświetlanego w galerii
`data-disabled` | Wartość `true` sprawi, że dane zdjęcie nie będzie uwzględnione w galerii


*Licence: [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)*  
*Copyright 2018 [Artur Mędrygał](mailto:medrygal.artur@gmail.com)*