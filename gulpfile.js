var meta      = require('./package.json'),
    del       = require('del'),
    bower     = require('gulp-bower'),
    cache     = require('gulp-cached'),
    concat    = require('gulp-concat'),
    csslint   = require('gulp-csslint'),
    cssmin    = require('gulp-cssmin'),
    gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    uglify    = require('gulp-uglify'),
    watch     = require('gulp-watch');


var scripts = [
  'bower_components/jquery-ui/jquery-ui.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/jasny-bootstrap/js/offcanvas.js',
  'src/js/functions.js',
  'src/js/hexclock.js',
  'src/js/interface.js'
];

var styles = [
  'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css',
  'src/css/theme.css'
]

/*
 * Task combos
 */
gulp.task('css',     ['cssmin']);
gulp.task('js',      ['uglify']);
gulp.task('lint',    ['csslint', 'jshint']);
gulp.task('make',    ['cssmin', 'uglify']);
gulp.task('makedev', ['cssconc', 'jsconc']);
gulp.task('travis',  ['csslint', 'jshint']);


gulp.task('init', ['bower'], function() {

  gulp.src([
    'bower_components/apache-server-configs/dist/.htaccess'
  ])
  .pipe(gulp.dest('.'));

});


gulp.task('bower', function() {
  return bower()
});


gulp.task('clean', function () {
    return
    del([
      'dist/'
    ])
});


/*
 * LINT CSS
 */
gulp.task('csslint', function() {
  return gulp.src([
    'src/css/theme.css'
  ])
  .pipe(cache('linting'))
  .pipe(csslint({
    // .panel-fullscreen requires !important
    'important': false
  }))
  .pipe(csslint.reporter())

});


gulp.task('cssmin', function() {

  gulp.src(styles)
  .pipe(concat('hex-o-clock.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist/css/'))

});


gulp.task('jshint', function() {

  return gulp.src([
    'src/js/*.js'
  ])
  .pipe(cache('linting'))
  .pipe(jshint())
  .pipe(jshint.reporter())

});


gulp.task('uglify', function() {

  gulp.src(scripts)
  .pipe(uglify())
  .pipe(concat('hex-o-clock.min.js'))
  .pipe(gulp.dest('dist/js/'))

});

gulp.task('cssconc', function() {

  gulp.src(styles)
  .pipe(concat('hex-o-clock.min.css'))
  .pipe(gulp.dest('dist/css/'))

});

gulp.task('jsconc', function() {

  gulp.src(scripts)
  .pipe(concat('hex-o-clock.min.js'))
  .pipe(gulp.dest('dist/js/'))

});

// Watch task
gulp.task('watch', function () {
   gulp.watch([
            scripts,
            styles
         ],
         ['lint'])
});