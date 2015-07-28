"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require("gulp-rename");

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
    gulp.src('./node_modules/angular/angular.js')
        .pipe(gulp.dest('./build/js/vendor'))
        .pipe(connect.reload());
});

gulp.task('bootstrap', function () {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./build/css/vendor'))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('clean', function (cb) {
    del(['./build'], cb);
});

gulp.task('build', ['clean'], function () {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(rename('bootstrap.css'))
        .pipe(gulp.dest('./build/css/vendor/'));
    gulp.src('./node_modules/angular/angular.min.js')
        .pipe(rename('angular.js'))
        .pipe(gulp.dest('./build/js/vendor'));
    gulp.src('./*.html')
        .pipe(gulp.dest('./build'));
    gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('default', ['angular', 'bootstrap', 'js', 'html', 'connect', 'watch']);