const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const prettify = require('gulp-html-prettify');

gulp.task('build', () => {
  gulp.src(['./src/pages/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(prettify({ indent_char: ' ', indent_size: 2 }))
    .pipe(gulp.dest('./dist'));
});

const compileSASS = (filename, options) =>
  sass('./src/**/*.scss', options)
    .pipe(autoprefixer('last 2 versions', '> 5%'))
    .pipe(concat(filename))
    .pipe(gulp.dest('./dist/assets/css'));

gulp.task('sass', () => compileSASS('custom.css', {}));

gulp.task('sass-minify', () => compileSASS('custom.min.css', { style: 'compressed' }));

gulp.task('scripts', () =>
  gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js')));

gulp.task('watch', () => {
  gulp.watch('./src/**/*.html', ['build']);
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['scripts']);
});

gulp.task('default', [
  'watch',
  'sass',
  'sass-minify',
  'scripts',
]);

