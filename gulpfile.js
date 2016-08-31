var gulp = require('gulp'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  changed = require('gulp-changed'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  source = require('vinyl-source-stream'),
  autoPrefix = require('gulp-autoprefixer'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  watchify = require('watchify'),
  browserSync = require('browser-sync').create()

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './public'
    },
    files: ['public/**/**.*'],
    open: false
  })
})

gulp.task('watch', ['jade', 'sass', 'js'], () => {
  gulp.watch('./src/*.jade', ['jade'])
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  return buildScript(true)
})

gulp.task('jade', () => {
  return gulp.src('./src/*.jade')
    .pipe(changed('./public/'))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./public/'))
})

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(changed('./public/css/'))
    .pipe(sass().on('error', gutil.log))
    .pipe(autoPrefix())
    .pipe(gulp.dest('./public/css/'))
})

gulp.task('js', () => {
  return buildScript(false)
})

function handleErrors() {
  var args = Array.prototype.slice.call(arguments)
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args)
  this.emit('end') // Keep gulp from hanging on this task
}

function buildScript(watch) {
  var file = 'app.js'
  var scriptsDir = './src/js'
  var buildDir = './public/js'

  var props = {
    entries: scriptsDir + '/' + file,
    debug: true,
    cache: {},
    packageCache: {}
  }

  var bundler = watch ? watchify(browserify(props)) : browserify(props)
  bundler.transform(babelify, { presets: ['es2015', 'react'] })

  function rebundle() {
    var stream = bundler.bundle()
    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest(buildDir + '/'))
  }

  if (watch) {
    bundler.on('update', function () {
      rebundle()
      gutil.log('Rebundle...')
    })
  }

  return rebundle()
}