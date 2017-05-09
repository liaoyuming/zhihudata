global.isProd = false;
global.app = ''; // for gulpfile-django
global.conf = require('./gulpvars.json');

require('./node_modules/gulpfile-django/gulp');

var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify
// handle es6 including imports.
gulp.task('es6', function() {
	browserify({ debug: true })
		.transform(babelify)
		.require(global.conf.path.js + '/app.js', { entry: true })
		.bundle()
		.on('error',gutil.log)
		.pipe(source('app.js'))
    	.pipe(gulp.dest(global.conf.path.dist))
        .pipe(notify('es6 task done'));
});

gulp.task('sass', function () {
    gulp.src(conf.path.sass + '/**/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest(conf.path.css))
        .pipe(browserSync.stream())
        .pipe(notify('sass task done'));
});

gulp.task('copy-vendor', function () {

    gulp.src('app/assets/vendor/**/**.*')
        .pipe(gulp.dest('app/static/vendor'))

    gulp.src('app/assets/vendor/**/*.*.*')
        .pipe(gulp.dest('app/static/vendor'))
        
    gulp.src(global.conf.path.vendor + '/**/*.js')
        .pipe(gulp.dest(global.conf.path.dist + '/vendor/js'));

    gulp.src(global.conf.path.vendor + '/echarts/map/**/*.js')
        .pipe(gulp.dest(global.conf.path.dist + '/vendor/js/echarts/map'))

});


// copy from gulpfile-django , and add es6 for watch scripts
gulp.task('watch', ['scripts-vendor', 'scripts', 'fonts'], function () {
    gulp.watch(conf.path.js + '/**/*.js', ['scripts', 'es6']).on('change', browserSync.reload);
    gulp.watch('bower.json', ['scripts-vendor']).on('change', browserSync.reload);
    gulp.watch(conf.path.sass + '/**/*.{sass,scss}', ['sass']);
    gulp.watch(conf.path.vendor + '/**/*.{ttf,woff,eof,svg}', ['fonts']).on('change', browserSync.reload);
    gulp.watch([
      conf.path.template + '/**/*.html',
      conf.path.image + '/**/*.{svg,jpg,png,jpeg,gif}']).on('change', browserSync.reload);
});

gulp.task('default', ['es6', 'scripts-vendor', 'copy-vendor', 'copy-vendor', 'scripts', 'sass', 'fonts']);
