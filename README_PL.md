# HesGallery
Lekki, wolny od zależności skrypt tworzący responsywną galerię

## Jak użyć?
Podepnij skrypty z galerią do strony  
Możesz skorzystać z hostowanego skryptu podpinając niniejszy skrypt lub zaimportować go lokalnie pobierając paczkę z plikami, pamiętaj jednak wtedy o podpięciu arkusza styli CSS i wyłączeniu automatycznego podpinania styli w opcjach
```html
<script src="https://api.heseya.com/hesgallery/hes-gallery.min.js"></script>
```

Każdemu containerowi ze zdjęciami który chcesz wykorzystać jako galerię nadaj klasę: (jeden container to jedna galeria)
```css
.hes-gallery
```

Ewentualnie modyfikuj działanie galerii przy pomocy opcji opisanych niżej

## Przykładowa konstrukcja galerii
```html
<div class="hes-gallery">
    <img src="image1.jpg" alt="image1" data-subtext="Podpis zdjęcia" data-alt="tekst alternatywny" />
    <img src="image2.jpg" alt="image2" data-subtext="Podpis zdjęcia kolejnego" />
    <img src="image3.jpg" alt="image3" data-subtext="Kolejny podpis zdjęcia" />
    <img src="image4.jpg" alt="image4" data-subtext="Podpis czwartego już zdjęcia" />
</div>
```

## Globalne opcje galerii
Jeśli chcesz, to możesz zmodyfikować opcje galerii aby jej działanie bardziej Ci odpowiadało za pomocą funkcji `HesGallery.setOptions()`  
Przykładowe zastosowanie:
```javascript
HesGallery.setOptions({
    wrapAround: true,
    disableScrolling: true
})
```

Parametr | Wartość domyślna | Opis
---|---|---
`wrapAround` | *false* | Zapętla galerię, czyli będąc na ostatnim zdjęciu galerii i przechodząc do następnego trafimy do pierwszego i analogicznie w drugą stronę
`showImageCount` | *true* | Wyświetlanie numeru aktualnego zdjęcia i liczby wszystkich zdjęć (np. "1/5")
`disableScrolling` | *false* | Możliwość przewijania strony w momencie gdy uruchomiona jest galeria
`hostedStyles` | *true* | Automatycznie podpina arkusz styli ze źródłem na api.heseya.com (wyłącz jeśli chcesz umieścić hes-gallery na własnym serwerze)
`animations` | *true* | Animacje w trakcie korzystania z galerii
`keyboardControl` | *true* | Sterowanie klawiaturą w galeriach
`minResolution` | *0* | Minimalna szerokość ekranu dla której galeria będzie działać (w px)

## Opcje poszczególnego bloku galerii
Jeśli zechcesz możesz nadać danemu zestawowi zdjęć inne opcje dodając atrybuty do konterena z klasą `.hes-gallery`  
**Artubuty przyjmują tylko wartości *true* lub *false*, w każdym innym przypadku galerią przyjmie wartości ustawione przez `HesGallery.setOptions()` lub domyślne!**
```html
<div class="hes-gallery" data-wrap="true" data-img-count='false' >
    <!-- Some <img> here -->
</div>
```
Dostępne opcje lokalne:  

Parametr | Odpowiednik globalny | Opis
---|---|---
`data-wrap` | *wrapAround* | Zapętla galerię, czyli będąc na ostatnim zdjęciu galerii i przechodząc do następnego trafimy do pierwszego i analogicznie w drugą stronę
`data-img-count` | *showImageCount* | Wyświetlanie numeru aktualnego zdjęcia i liczby wszystkich zdjęć (np. "1/5")

## Dostępne funkcje
Kilka funkcji sterujących galeriią które możesz umieścić w wybranym przez siebie miejscu

Funkcja | Opis
---|---
`HesGallery.init()` | Pozwala na przeładowanie galerii zdjęć, jeśli np. w międzyczasie dynamicznie zmieniła się zawartość pojemnika galerii to dzięki tej funckji można na nowo załadować zdjęcia do skryptu
`HesGallery.show(m, n)` | Wyświetla **n-te** zdjęcie z **m-tej** galerii
`HesGallery.next()` | Wyświetla następne zdjęcie względem obecnego
`HesGallery.prev()` | Wyświetla poprzednie zdjęcie względem obecnego
`HesGallery.hide()` | Ukrywa galerię
`HesGallery.setOptions()` | Pozwala na modyfikację opcji galerii (więcej wyżej)

## Parametry tagu img
Parametr | Opis
---|---
`data-subtext` | Tworzy podpis pod zdjęciem w galerii
`data-alt` | Ustawia atrybut alt obrazka wyświetlanego w galerii
`data-disabled` | Wartość `true` sprawi, że dane zdjęcie nie będzie uwzględnione w galerii
`data-fullsize` | Jeżeli chcemy wykorzystać miniaturki to do tagu `src` zwykłego obrazka podajemy ścieżke do miniatury a do tagu `data-fullsize` ścieżkę do pełnej wersji grafiki


*Licence: [MIT](https://opensource.org/licenses/MIT)*  
*Copyright 2018 [Artur Mędrygał](mailto:medrygal.artur@gmail.com)*