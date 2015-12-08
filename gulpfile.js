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
var del = require('del');
var path = require('path');
var mobilizer = require('gulp-mobilizer');
var os                = require('os');
var seq               = require('run-sequence');
var csso              = require('gulp-csso');
var concat            = require('gulp-concat');
var uglify            = require('gulp-uglify');

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

gulp.task('clean', function (cb) {
  del(['dist/**'], cb);
});

/*=============================
=            Globs            =
=============================*/

var GLOBS = {};
GLOBS.core                  = ['src/js/core/**/*.js', 'src/js/mobile-angular-ui.core.js'];
GLOBS.components            = ['src/js/components/**/*.js', 'src/js/mobile-angular-ui.components.js'];
GLOBS.gestures              = ['src/js/gestures/**/*.js', 'src/js/mobile-angular-ui.gestures.js'];
GLOBS.migrate               = ['src/js/migrate/**/*.js', 'src/js/mobile-angular-ui.migrate.js'];
GLOBS.main                  = GLOBS.core.concat(GLOBS.components).concat('src/js/mobile-angular-ui.js');
//GLOBS.fonts                 = 'bower_components/font-awesome/fonts/fontawesome-webfont.*';


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

var CSS_TEMP_DIR = path.join(os.tmpdir(), 'mobile-angular-ui', 'css');

gulp.task('css:less', function () {
    gulp.src([
      'src/less/mobile-angular-ui-base.less',
      'src/less/mobile-angular-ui-desktop.less',
      'src/less/mobile-angular-ui-migrate.less',
      'src/less/sm-grid.less'
    ])
    .pipe(less({paths: GLOBS.vendorLess}))
    .pipe(mobilizer('mobile-angular-ui-base.css', {
      'mobile-angular-ui-base.css': { hover: 'exclude', screens: ['0px'] },
      'mobile-angular-ui-hover.css': { hover: 'only', screens: ['0px'] }
    }))
    .pipe(gulp.dest(CSS_TEMP_DIR));
});

gulp.task('css:concat', function() {
  return gulp.src([
    path.join(CSS_TEMP_DIR, 'sm-grid.css'),
    path.join(CSS_TEMP_DIR, 'mobile-angular-ui-base.css')
  ])
  .pipe(concat('mobile-angular-ui-base.css'))
  .pipe(gulp.dest(path.join('dist', 'css')));
});

gulp.task('css:copy', function() {
  return gulp.src([
    path.join(CSS_TEMP_DIR, 'mobile-angular-ui-hover.css'),
    path.join(CSS_TEMP_DIR, 'mobile-angular-ui-migrate.css'),
    path.join(CSS_TEMP_DIR, 'mobile-angular-ui-desktop.css')
  ])
  .pipe(gulp.dest(path.join('dist', 'css')));
});

gulp.task('css:minify', function() {
  return gulp.src(path.join('dist', 'css', '*.css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join('dist', 'css')));
});

gulp.task('css', function(done) {
  seq('css:less', 'css:concat', 'css:copy', 'css:minify', done);
});

/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/

var compileJs = function(dest, src) {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(concat(dest))
    .pipe(gulp.dest(path.join('dist', 'js')))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join('dist', 'js')));
};

gulp.task('js:core',  function() {
  return compileJs('mobile-angular-ui.core.js', GLOBS.core);
});

gulp.task('js:migrate',  function() {
  return compileJs('mobile-angular-ui.migrate.js', GLOBS.migrate);
});

gulp.task('js:gestures',  function() {
  return compileJs('mobile-angular-ui.gestures.js', GLOBS.gestures);
});

gulp.task('js:main',  function() {
  return compileJs('mobile-angular-ui.js', GLOBS.main);
});

gulp.task('js', ['js:main', 'js:gestures', 'js:migrate', 'js:core']);

/*==================================
=            Copy fonts            =
==================================*/

gulp.task('fonts', function() {
  return gulp.src(GLOBS.fonts)
  .pipe(gulp.dest(path.join('dist', 'fonts')));
});

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  del(['dist/**'], cb);
});

gulp.task('build', function(done) {
  seq('clean', ['fonts', 'css',  'js'], done);
});


//--test for mongo db
gulp.task('testMongo',function(){
    test.smallSave();
});

gulp.task('getTank',function(){
    test.getTanks();
});