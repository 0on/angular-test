"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: './build',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./js/**/*.js')
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
});

gulp.task('angular', function () {
    // todo make it normal
    gulp.src('./node_modules/angular/angular.js')
        .pipe(gulp.dest('./build/js/vendor'))
        .pipe(connect.reload());
});

gulp.task('bootstrap', function () {
    // todo make it normal
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./build/css/vendor'))
        .pipe(connect.reload());
});



gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('default', ['angular', 'bootstrap', 'js', 'html', 'connect', 'watch']);