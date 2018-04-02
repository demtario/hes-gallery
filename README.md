![logo] (https://api.heseya.com/hesgallery/logo.png)  
v1.4.0 (Multi Gallery Update)

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

Ewentualnie modyfikuj działanie skryptu przez **Opcje skryptu** (Akapit niżej)

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
Jeśli chcesz, to możesz zmodyfikować opcje galerii aby jej działanie bardziej Ci odpowiadało za pomocą funckji *HesGallery.setOptions()*  
Przykładowe zastosowanie:
```javascript
HesGallery.setOptions({
    wrapAround: true,
    disableScrolling: true
})
```

Parametr|Wartość domyślna|Opis
---|---|---
*wrapAround* | false | Zapętla galerię, czyli będąc na ostatnim zdjęciu galerii i przechodząc do następnego trafimy do pierwszego i analogicznie w drugą stronę
*disableScrolling* | false | Możliwość przewijania strony w momencie gdy uruchomiona jest galeria
*showImageCount* | true | Wyświetlanie numeru aktualnego zdjęcia i liczby wszystkich zdjęć (np. "1/5")
*hostedStyles* | true | Automatycznie podpina arkusz styli ze źródłem na api.heseya.com (wyłącz jeśli chcesz umieścić hes-gallery na własnym serwerze)

## Dostępne funkcje
Kilka funkcji sterujących galeriią które możesz umieścić w wybranym przez siebie miejscu

Funkcja | Opis
---|---
*HesGallery.init()* | Pozwala na przeładowanie galerii zdjęć, jeśli np. w międzyczasie dynamicznie zmieniła się zawartość pojemnika galerii to dzięki tej funckji można na nowo załadować zdjęcia do skryptu
*HesGallery.show(**n**)* | Wyświetla **n-te** zdjęcie z galerii
*HesGallery.next()* | Wyświetla następne zdjęcie względem obecnego
*HesGallery.prev()* | Wyświetla poprzednie zdjęcie względem obecnego
*HesGallery.hide()* | Ukrywa galerię
*HesGallery.setOptions()* | Pozwala na modyfikację opcji galerii (więcej wyżej)

## Parametry <img>
Parametr | Opis
---|---
*data-subtext* | Tworzy podpis pod zdjęciem w galerii
*data-alt* | Ustawia atrybut alt obrazka wyświetlanego w galerii


*Licencja: [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)*  
*Copyright 2018 [Artur Mędrygał](mailto:amedrygal@heseya.com) - [Heseya](https://heseya.com)*