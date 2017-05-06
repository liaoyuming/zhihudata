global.isProd = false;
global.app = require('./package.json');
global.conf = require('./gulpvars.json');

require('./node_modules/gulpfile-django/gulp');

var gulp = require('gulp');

gulp.task('scripts-lib', function() {
    gulp.src(global.conf.path.vendor + '/**/*.js')
        .pipe(gulp.dest(global.conf.path.dist + '/vendor/js'));
})
