//Dependencies
const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      images = require('gulp-imagemin'),
      browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
//Source and Destination paths
const styleSrc = 'src/sass/**/*.sass',
      styleDest = 'build/assets/css',
      scriptSrc = 'src/js/**/*.js',
      scriptDest = 'build/assets/js',
      imageSrc = 'src/img/*',
      imageDest = 'build/assets/img',
      htmlSrc = 'build/*.html';

//Functions for tasks

//Compile SASS -> Add prefixes -> Minifies/Rename -> Put in build folder
function style() {
    return src(styleSrc)
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(dest(styleDest))
}

//Minify ES6 Javascript -> Put in build folder
function uglifyJS() {
    return src(scriptSrc)
    .pipe(uglify())
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(dest(scriptDest))
}

//Compress images -> Put in build folder
function imageMin() {
    return src(imageSrc)
    .pipe(images())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(dest(imageDest))
}

//Watch for changes and BrowserSync
function watchFiles() {

    browserSync.init({
        server:{
            baseDir: './build'
        },
        notify: false
    });
    style();
    uglifyJS();
    imageMin();
    watch(styleSrc, style);
    watch(scriptSrc, uglifyJS);
    watch([styleDest, scriptDest, htmlSrc]).on('change', browserSync.reload);
}

//Export tasks 
exports.style = style;
exports.images = imageMin;
exports.uglify = uglifyJS;
exports.watch = watchFiles;