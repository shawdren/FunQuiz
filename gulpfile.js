var yargs = require('yargs').argv;
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
//var clean = require('gulp-clean');
var server = require('gulp-express');
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
          , tasks: ['source'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

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


 

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);
    // Restart the server when file changes 
    //gulp.watch(['app/**/*.html'], server.notify);
    //gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]); 
    //Event object won't pass down to gulp.watch's callback if there's more than one of them. 
    //So the correct way to use server.notify is as following: 
    
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
    //    gulp.run('styles:css');
    //    server.notify(event);
    //    //pipe support is added for server.notify since v0.1.5, 
        //see https://github.com/gimm/gulp-express#servernotifyevent 
    //});
 
    //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    //gulp.watch(['app/images/**/*'], server.notify);
    //gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
    gulp.start('watch');
});

gulp.task('testMongo',function(){
    test.smallSave();
});