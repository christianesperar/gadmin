const gulp = require('gulp');
const merge = require('merge-stream');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const prettier = require('gulp-prettier');

gulp.task('build', () =>
  gulp
    .src(['src/pages/*.html', 'src/pages/**/index.html'])
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(prettier())
    .pipe(gulp.dest('dist'))
);

const compileSASS = (directories, filename, outputStyle = 'nested') =>
  gulp
    .src(directories)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', '> 5%'))
    .pipe(sass({ outputStyle }))
    .pipe(concat(filename))
    .pipe(gulp.dest('dist/assets/css'));

gulp.task('sass', () => {
  const path = {
    bootstrap: 'src/assets/scss/bootstrap/*.scss',
    theme: [
      'src/assets/scss/theme/*.scss',
      'src/partials/**/*.scss',
      'src/assets/scss/libraries/*.scss'
    ],
    excludable: 'src/assets/scss/excludable.scss'
  };

  return merge(
    compileSASS(path.theme, 'theme.css'),
    compileSASS(path.bootstrap, 'bootstrap.css'),
    compileSASS(path.excludable, 'excludable.css'),
    compileSASS(path.theme, 'theme.min.css', 'compressed'),
    compileSASS(path.bootstrap, 'bootstrap.min.css', 'compressed'),
    compileSASS(path.excludable, 'excludable.min.css', 'compressed')
  );
});

gulp.task('scripts', () =>
  gulp
    .src('src/**/*.js')
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
);

gulp.task('watch', () => {
  gulp.watch(['src/**/*.html', 'src/**/*.json'], gulp.series('build'));
  gulp.watch('src/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.js', gulp.series('scripts'));
});

gulp.task('ci', gulp.parallel('build', 'sass', 'scripts'));

gulp.task('default', gulp.parallel('build', 'sass', 'scripts', 'watch'));
