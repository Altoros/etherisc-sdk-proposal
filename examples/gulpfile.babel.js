import gulp from 'gulp';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';
import svg from 'gulp-svg-sprite';
import rimraf from 'gulp-rimraf';
import { findAPortNotInUse } from 'portscanner';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import fontMagician from 'postcss-font-magician';
import sourcemaps from 'gulp-sourcemaps';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import statsLogger from 'webpack-stats-logger';

const sync = browserSync.create();
let port;

gulp.task('default', ['nodemon', 'icons', 'styles', 'scripts'], () => {
  gulp.watch('assets/icons-source/*.svg', ['icons']);
  gulp.watch(['assets/styles/**/*.scss'], ['styles']);
});

/*
 * Browser sync
 */
gulp.task('browser-sync', async () => {
  port = await findAPortNotInUse(4000);
  sync.init({
    proxy: `localhost:${port}`,
    notify: true,
    files: [
      'views/**/*.html',
      'public/css/*.css',
      'public/scripts/*.*'
    ]
  });
});

/*
 * Server
 */
gulp.task('nodemon', ['browser-sync'], (cb) => {
  let started = false;

  return nodemon({
    script: 'server.js',
    exec: 'babel-node',
    ext: 'js',
    env: {
      'NODE_ENV': 'development',
      PORT: port
    },
    ignore: [
      'node_modules/',
      'gulpfile.babel.js',
      'assets/',
      'public/'
    ]
  })
    .on('start', () => {
      if (!started) {
        started = true;
        cb();
      }
    })
    .on('restart', () =>
      setTimeout(() => sync.reload({ stream: false }), 1000));
});

/**
 * Icons
 */
gulp.task('icons', ['clean-icons'], () => {
  gulp.src('assets/icons/*.svg')
    .pipe(svg({
      shape: {
        dimension: {
          maxWidth: 32,
          maxHeight: 32
        }
      },
      spacing: {
        padding: 0
      },

      mode: {
        view: {
          bust: false,
          render: {
            scss: true
          }
        },
        symbol: true
      }
    }))
    .pipe(gulp.dest('public/icons'))
});


/**
 * Clean icons
 */
gulp.task('clean-icons', () => {
  return gulp.src('public/icons')
    .pipe(rimraf({forse: true}))
})


/**
 * Styles
 */
gulp.task('styles', ['clean-styles'], () => {
  gulp.src('assets/styles/boot.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      sourceMap: true
    }))
    .pipe(postcss([
      fontMagician(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});


/**
 * Clean styles
 */
gulp.task('clean-styles', () => {
  return gulp.src('public/css')
    .pipe(rimraf({forse: true}))
})


/**
 * JS
 */
gulp.task('scripts', ['clean-scripts'],  () => {
  return webpack(webpackConfig, (error, stats) => {
    statsLogger(error, stats);
  });
});

/**
 * Clean styles
 */
gulp.task('clean-scripts', () => {
  return gulp.src('public/scripts')
    .pipe(rimraf({forse: true}))
})
