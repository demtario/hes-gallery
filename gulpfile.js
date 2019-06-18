const gulp = require('gulp')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean-css')
const del = require('del')
const babel = require('gulp-babel')
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
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dist))
    .pipe(clean())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist))

  // JavaScript
  gulp.src(paths.src.js)
    .pipe(babel({
      presets: [['env', {
        modules: false
      }]],
    }))
      .on('error', function(err) {
        console.error('[Compilation Error]')
        console.log('error Babel: ' + err.message + '\n')
        console.log(err.codeFrame)
        this.emit('end')
      })
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist))
})

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.src.css, ['build'])
  gulp.watch(paths.src.js, ['build'])
})

gulp.task('clean', () => {
  return del([paths.dist]);
})

gulp.task('default', ['build'])