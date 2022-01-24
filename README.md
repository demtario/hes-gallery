# HesGallery

![licence](https://img.shields.io/npm/l/hes-gallery)
[![version](https://img.shields.io/npm/v/hes-gallery)](https://www.npmjs.com/package/hes-gallery)
[![downloads](https://img.shields.io/npm/dw/hes-gallery)](https://www.npmjs.com/package/hes-gallery)

Light, dependency free script creating a responsive gallery

## Instalation

Attach scripts to page
You can use a hosted version by hooking this script or import it locally by downloading a package of files, but remember to attach a CSS style sheet and disable the auto-hooking of styles in the options (more in _Global options_ section).

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
  disableScrolling: true,
})

HesGallery.init({
  wrapAround: true,
  disableScrolling: true,
})
```

**Important**
If you change the settings after initializing the script, not all options can be applied. To make sure that they will, use `HesGallery.init(options)` function.

### Possible options:

| Parameter          | Default | Description                                                                                                                       |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `wrapAround`       | _false_ | Create loop on gallery, you can go from last photo to first with one click                                                        |
| `showImageCount`   | _true_  | Show number of current photo (for example "1/5")                                                                                  |
| `disableScrolling` | _false_ | Disable scrolling when gallery is on                                                                                              |
| `hostedStyles`     | _true_  | Automatically attaches a style sheet to the source on api.heseya.com (turn off if you want to put hes-gallery on your own server) |
| `animations`       | _true_  | Using animations in gallery                                                                                                       |
| `keyboardControl`  | _true_  | Keyboard control in galleries                                                                                                     |
| `minResolution`    | _0_     | The minimum screen width for which the gallery will work (in px)                                                                  |
| `autoInit`         | _true_  | If true, automaticly run `HesGallery.init()` when DOM Content is loaded                                                           |
| `linkNested`       | _false_ | If true, you can use images nested in links                                                                                       |

## Options of single gallery

If you like, you can give one set of other options by adding attributes to the `.hes-gallery` class's container
**Attributes accept only _true_ or _false_ value, in any other case the gallery will adopt values set by `HesGallery.setOptions ()` or default!**

```html
<div class="hes-gallery" data-wrap="true" data-img-count="false">
  <!-- Some <img> here -->
</div>
```

### Available local options:

| Parameter        | Global equivalent | Description                                                                |
| ---------------- | ----------------- | -------------------------------------------------------------------------- |
| `data-wrap`      | _wrapAround_      | Create loop on gallery, you can go from last photo to first with one click |
| `data-img-count` | _showImageCount_  | Show number of current photo (for example "1/5")                           |

## Available functions

Some of functions which you can use to manage the gallery

| Function                  | Description                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `HesGallery.init()`       | Reloads the gallery in case when for example content of gallery container has changed and we want to have actual images in gallery |
| `HesGallery.show(m, n)`   | Show **n** photo from **m** gallery                                                                                                |
| `HesGallery.next()`       | Show next photo                                                                                                                    |
| `HesGallery.prev()`       | Show previous photo                                                                                                                |
| `HesGallery.hide()`       | Hide gallery                                                                                                                       |
| `HesGallery.setOptions()` | Allows you to modify the gallery options (more above)                                                                              |

## Img tag parameters

| Parameter       | Description                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-subtext`  | He creates a signature under the picture in the gallery                                                                                                    |
| `data-disabled` | If set will cause that the image will not be included in the gallery                                                                                       |
| `data-fullsize` | If we want to use thumbnails, we give the thumbnail path to the `src` tag and a path to the full version of graphics to the` data-fullsize` tag            |
| `data-src`      | Some plugins (PR #12) can use this attribute to get the path to the photo. If this param exists, the HesGallery will use it, insead of the `src` attribute |

## Images nested in Links

To support browsers without JavaScript, an option is to statically link the "large" images like so:

```html
<div class="hes-gallery">
  <a href="image1-large.jpg" class="hg-image">
    <img src="image1-small.jpg" alt="image1" data-subtext="Subtext" />
  </a>
  ...
</div>
```

In that case, users can still open an expanded view but if JS is enabled, they get the HesGallery.
To enable this feature, set `linkNested` to true in the options during initialisation.

## Contribution

Feel free to contribute any changes/features for future versions of HesGallery. Please work, and create Pull Pequests on `develop` branch.

To run build scripts you probably need node in version `11`.

### How to run?

1. Install dependecies with `npm i` command
2. By `npm run dev` you can run development server with gulp & browsersync to faster the development of your feature
3. You can also use a `npm run build` to only build a script by babel and minimalize code
4. It would be also greate if you can provide a examples of your feature in readme and in `/demo` folder
5. When you finish, push your changes and create a Pull Request

Thanks for your help!

_Licence: [MIT](https://opensource.org/licenses/MIT)_
_Copyright 2019 [Artur Mędrygał](mailto:medrygal.artur@gmail.com)_
