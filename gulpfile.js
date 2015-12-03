var yargs = require('yargs').argv;
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');

var option = {base: 'views'};
var dist = __dirname + '/dist';

gulp.task('source', function(){
    console.log(dist);
    gulp.src('views/**/**/*.!(less)')
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('test', function(){
    gulp.src('app.js')
        .pipe(gulp.dest(dist));
});

gulp.task('watch', function () {
    //gulp.watch('src/**/*.less', ['styles']);
    gulp.watch('views/app/**/*.{html,js}', ['source'], function () {
        browserSync.reload();
    });
});

gulp.task('server', function () {
    yargs.p = yargs.p || 3001;
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/app/views'
    });
});


gulp.task('default', ['source'], function () {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});