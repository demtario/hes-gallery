# HesGallery
![licence](https://img.shields.io/npm/l/hes-gallery)
[![version](https://img.shields.io/npm/v/hes-gallery)](https://www.npmjs.com/package/hes-gallery)
[![downloads](https://img.shields.io/npm/dw/hes-gallery)](https://www.npmjs.com/package/hes-gallery)

Light, dependency free script creating a responsive gallery

## Instalation
Attach scripts to page
You can use a hosted version by hooking this script or import it locally by downloading a package of files, but remember to attach a CSS style sheet and disable the auto-hooking of styles in the options (more in *Global options* section).
```html
<script src="https://unpkg.com/hes-gallery/dist/hes-gallery.min.js"></script>
```
When using CDN global object `HesGallery` will be registred

You can also install package by **npm** or **yarn**
```
$ npm i hes-gallery

$ yarn add hes-gallery
```

## How to use?
For each container with photos that you want to use as a gallery, give the class: (Each container is a singe, independent gallery)
```css
.hes-gallery
```

You can modify the options of the gallery using function described below

## Sample gallery design
```html
<div class="hes-gallery">
    <img src="image1.jpg" alt="image1" data-subtext="Subtext" />
    <img src="image2.jpg" alt="image2" data-subtext="Second subtext" />
    <img src="image3.jpg" alt="image3" data-subtext="Subtext" />
    <img src="image4.jpg" alt="image4" data-subtext="Subtext" />
</div>
```

## Global options
If you want, you can modify the gallery options to make it work better to you by using function `HesGallery.setOptions()`, you can also change settings passing settings object to `HesGallery.init()` function.  
Sample:
```javascript
HesGallery.setOptions({
    wrapAround: true,
    disableScrolling: true
})

HesGallery.init({
    wrapAround: true,
    disableScrolling: true
})
```
**Important**  
If you change the settings after initializing the script, not all options can be applied. To make sure that they will, use `HesGallery.init(options)` function.

### Possible options:
Parameter | Default | Description
---|---|---
`wrapAround` | *false* | Create loop on gallery, you can go from last photo to first with one click
`showImageCount` | *true* | Show number of current photo (for example "1/5")
`disableScrolling` | *false* | Disable scrolling when gallery is on
`hostedStyles` | *true* | Automatically attaches a style sheet to the source on api.heseya.com (turn off if you want to put hes-gallery on your own server)
`animations` | *true* | Using animations in gallery
`keyboardControl` | *true* | Keyboard control in galleries
`minResolution` | *0* | The minimum screen width for which the gallery will work (in px)
`autoInit` | *true* | If true, automaticly run `HesGallery.init()` when DOM Content is loaded

## Options of single gallery
If you like, you can give one set of other options by adding attributes to the `.hes-gallery` class's container 
**Attributes accept only *true* or *false* value, in any other case the gallery will adopt values set by `HesGallery.setOptions ()` or default!**
```html
<div class="hes-gallery" data-wrap="true" data-img-count='false' >
    <!-- Some <img> here -->
</div>
```

### Available local options:  
Parameter | Global equivalent | Description
---|---|---
`data-wrap` | *wrapAround* | Create loop on gallery, you can go from last photo to first with one click
`data-img-count` | *showImageCount* | Show number of current photo (for example "1/5")

## Available functions
Some of functions which you can use to manage the gallery

Function | Description
---|---
`HesGallery.init()` | Reloads the gallery in case when for example content of gallery container has changed and we want to have actual images in gallery
`HesGallery.show(m, n)` | Show **n** photo from **m** gallery
`HesGallery.next()` | Show next photo
`HesGallery.prev()` | Show previous photo
`HesGallery.hide()` | Hide gallery
`HesGallery.setOptions()` | Allows you to modify the gallery options (more above)

## Img tag parameters
Parameter | Description
---|---
`data-subtext` | He creates a signature under the picture in the gallery
`data-disabled` | If set will cause that the image will not be included in the gallery
`data-fullsize` | If we want to use thumbnails, we give the thumbnail path to the `src` tag and a path to the full version of graphics to the` data-fullsize` tag


*Licence: [MIT](https://opensource.org/licenses/MIT)*  
*Copyright 2019 [Artur Mędrygał](mailto:medrygal.artur@gmail.com)*
