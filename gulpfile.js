const gulp = require('gulp')
const minify = require('gulp-minify')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean-css')
const del = require('del')
const rename = require('gulp-rename')

const paths = {
  src: {
    all: './src/*.*',
    js: "./src/hes-gallery.js",
    css: "./src/hes-gallery.css"
  },
  dist: './dist'
}

gulp.task('build', ['clean'], () => {
  // CSS
  gulp.src(paths.src.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(clean())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist))

  // JavaScript
  gulp.src(paths.src.js)
    .pipe(minify({
      preserveComments: 'some',
      ext:{
        src:'.js',
        min:'.min.js'
    },
    }))
    .pipe(gulp.dest(paths.dist))
})

gulp.task('clean', () => {
  return del([paths.dist]);
})

gulp.task('default', ['build'])