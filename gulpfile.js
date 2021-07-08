'use strict';

const gulp        = require('gulp');
const util        = require('gulp-util');
const sass        = require('gulp-sass');
const prefixer    = require('gulp-autoprefixer');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const rename      = require('gulp-rename');
const handlebars  = require('gulp-compile-handlebars');
const browserSync = require('browser-sync');
const sassGlob    = require('gulp-sass-bulk-import');
const watch       = require('gulp-watch');
const babel       = require('gulp-babel');
const htmlmin     = require('gulp-htmlmin');
const cleanCSS    = require('gulp-clean-css');
const imagemin    = require('gulp-imagemin');

var paths = {
  src: { root: 'src' },
  dist: { root: 'dist' },
  init: function() {
    this.src.sass        = this.src.root + '/scss/main.scss';
    this.src.templates   = this.src.root + '/**/*.hbs';
    this.src.javascript  = [this.src.root + '/js/**/*.js', '!' + this.src.root + '/js/libs/*.js'];
    this.src.libs        = this.src.root + '/js/libs/*.js';
    this.src.images      = this.src.root + '/images/**/*.{jpg,jpeg,svg,png,gif,webm,mp4}';
    this.src.favicon     = this.src.root + '/favicon/**/*.{jpg,jpeg,svg,png,gif,webm,xml,webmanifest,ico}';
    this.src.video       = this.src.root + '/video/**/*.{mp4,webm,jpg}';
    this.src.fonts       = this.src.root + '/fonts/*';
    this.src.files       = this.src.root + '/*.{html,txt,xml}';
    this.src.config      = this.src.root + '/.htaccess';

    this.dist.css        = this.dist.root + '/css';
    this.dist.images     = this.dist.root + '/images';
    this.dist.favicon    = this.dist.root + '/favicon';
    this.dist.video      = this.dist.root + '/video';
    this.dist.fonts      = this.dist.root + '/fonts';
    this.dist.javascript = this.dist.root + '/js';
    this.dist.libs       = this.dist.root + '/js/libs';

    return this;
  },
}.init();

function serve() {
  browserSync.init({
    server: paths.dist.root,
    open: true,
    notify: false,
    port: 8000,
    online: false,
  });
}

function styles() {
  return gulp.src([paths.src.sass])
    .pipe(sassGlob())
    .on('error', util.log)
    .pipe(sass({
      includePaths: ['src/scss'],
    }))
    .on('error', util.log)
    .pipe(prefixer('last 2 versions'))
    .on('error', util.log)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.reload({stream: true}));
}

/*
* Compile handlebars/partials into html
*/
function compile() {
  var options = {
    ignorePartials: true,
    batch: ['src/partials'],
    helpers : {
      ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      }
    }
  };

  return gulp.src(paths.src.templates)
    .pipe(handlebars(null, options))
    .on('error', util.log)
    .pipe(rename({
      extname: '.html',
    }))
    .on('error', util.log)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
  return gulp.src(['src/js/libs/*.js', 'src/js/*.js' ])
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('bundle.js'))
    .on('error', util.log)
    .pipe(uglify())
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.javascript))
    .pipe(browserSync.reload({stream: true}));
};

function images() {
  return gulp.src([paths.src.images])
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
}

// without imagemin()
function imagesWatch() {
  return gulp.src([paths.src.images])
    .pipe(gulp.dest(paths.dist.images));
}

function favicon() {
  return gulp.src([paths.src.favicon])
    .pipe(gulp.dest(paths.dist.favicon));
}

function config() {
  return gulp.src([paths.src.config])
    .pipe(gulp.dest(paths.dist.root));
}

function video() {
  return gulp.src([paths.src.video])
    .pipe(gulp.dest(paths.dist.video));
}

function fonts() {
  return gulp.src([paths.src.fonts])
    .pipe(gulp.dest(paths.dist.fonts));
}

function files() {
  return gulp.src([paths.src.files])
    .pipe(gulp.dest(paths.dist.root));
}

function watchFiles() {
  gulp.watch('src/scss/**/*.scss', gulp.series(styles));
  gulp.watch(paths.src.javascript, gulp.series(scripts));
  gulp.watch([
    paths.src.templates,
  ], gulp.series(compile));
  gulp.watch(paths.src.images, gulp.series(imagesWatch));
}

// gulp build
gulp.task('build', gulp.series(
  fonts,
  images,
  favicon,
  video,
  files,
  styles,
  scripts,
  compile,
  config,
  (done) => {
    done();
    process.exit(0);
  },
));

// gulp
gulp.task('default', gulp.series(
  fonts,
  imagesWatch,
  favicon,
  video,
  files,
  styles,
  scripts,
  compile,
  config,
  gulp.parallel(watchFiles, serve)
));
