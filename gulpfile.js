//gulpの読み込み
var gulp = require('gulp');

//sassをコンパイルするためのモジュール
var sass = require('gulp-sass');

//自動でベンダープレフィックスを付与するモジュール
var autoprefixer = require('gulp-autoprefixer');

//browserSyncのタスク設定
var browserSync = require('browser-sync');
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
});

//リロードのタスク
gulp.task('reload', function() {
  browserSync.reload();
});

//sassをコンパイルするタスクを設定
gulp.task('css', function() {
  //.scssフォルダ内の拡張子[.scss]のファイルすべてを
  //scssでコンパイルして、
  //それを「./deploy/css/styles」に格納する
  gulp.src('./_scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer('last 3 version'))
      .pipe(gulp.dest('./deploy/css/styles'));
});

//監視
gulp.task('watch', function() {
  gulp.watch('./_scss/**/*.scss', ['css', 'reload']);
});

gulp.task('default', ['css', 'browser-sync', 'watch']);