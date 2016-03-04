var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var expect = require('gulp-expect-file');
var minifyCSS = require('gulp-cssnano');

var files = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular/angular.min.js.map',
  'bower_components/angular-aria/angular-aria.min.js',
  'bower_components/angular-aria/angular-aria.min.js.map',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/angular-animate/angular-animate.min.js.map',
  'bower_components/angular-material/angular-material.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-route/angular-route.min.js.map',
  'bower_components/angular-sanitize/angular-sanitize.min.js',
  'bower_components/angular-sanitize/angular-sanitize.min.js.map',
  'bower_components/angular-messages/angular-messages.min.js',
  'bower_components/angular-messages/angular-messages.min.js.map',
  'bower_components/leaflet/dist/leaflet.js',
  'app/assets/scripts/leaflet-heat.js'
];

var styles = [
    'bower_components/leaflet/dist/leaflet.css',
    'bower_components/angular-material/angular-material.css'
];

var EXTERNAL_FONTS = [];

gulp.task('build-vendors', ['build-vendors-css', 'build-vendors-fonts'], function () {
  gulp.src(files)
    .pipe(expect({ errorOnFailure: true }, files))
    .pipe(gulpif(/[.]js$/, concat('vendors.js')))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('build-vendors-css', function(){
  gulp.src(styles)
    .pipe(expect({ errorOnFailure: true }, styles))
    .pipe(gulpif(/[.]css$/, concat('vendors.css')))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/assets/css/'));
});


gulp.task('build-vendors-fonts', function(){
  gulp.src(EXTERNAL_FONTS)
    .pipe(expect({ errorOnFailure: true }, EXTERNAL_FONTS))
    .pipe(gulp.dest('./build/assets/fonts/'));
});













