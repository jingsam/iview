var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var less = require('postcss-less-engine');
var autoprefixer = require('autoprefixer');
var clean = require('postcss-clean');


// 编译less
gulp.task('css', function () {
     gulp.src('../src/styles/index.less')
        .pipe(postcss([
            less(),
            autoprefixer({ "browsers": ['last 2 versions', 'ie > 8'] }),
            clean()
        ], { parser: less.parser }))
        .pipe(rename('iview.css'))
        .pipe(gulp.dest('../dist/styles'))
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/styles/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'))
});

gulp.task('default', ['css', 'fonts']);
