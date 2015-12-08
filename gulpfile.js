var yargs = require('yargs').argv;
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var test = require('./test.js');
var nodemon = require('gulp-nodemon');

var option = {base: 'views'};
var dist = __dirname + '/dist';

gulp.task('source', function(){
    gulp.src('views/**/**/*.!(less)')
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', function () {
    //gulp.watch('src/**/*.less', ['styles']);
    gulp.watch('views/app/**/*.{html,js}', ['source'], function () {
        browserSync.reload();
    });
}); 

gulp.task('develop', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , tasks: ['source','watch'] })
    .on('restart', function () {
      console.log('restarted!')
    })
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
    if(yargs.d){
        gulp.start('develop');
    }
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});


//--test for mongo db
gulp.task('testMongo',function(){
    test.smallSave();
});

gulp.task('getTank',function(){
    test.getTanks();
});