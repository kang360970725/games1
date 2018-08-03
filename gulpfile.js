/**
 * @description 2018/7/17 gulp
 * @author liangyanxiang
 * @version 1.0.0
 *
 */

const gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	changed = require("gulp-changed"),
	stripDebug = require('gulp-strip-debug'),
	babel = require("gulp-babel"),
	es2015 = require("babel-preset-es2015");

const commonSrc = {
	url: "src/",
	js: "src/lib/src/**/*.js",
},
	dist = {
		url: "dist/",
		js: "src/lib",
	};

gulp.task('js', function () {
	return gulp.src([commonSrc.js,])
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(stripDebug())//除去js代码中的console和debugger输出
		.pipe(uglify({ outSourceMap: false, mangle: false }))
		// .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist.js))
		//.pipe(reload({ stream: true }));
});


gulp.task('myWatch', function () {
	gulp.watch([commonSrc.js], ['js']);
});



gulp.task('default', [/*'browser-sync', */'myWatch'], function () {
	console.log("run gulp");
	console.info("\n=>=>此版本支持ES6转ES5=>=>\n");
});

gulp.task('build', ['js',], function () {
	console.log("打包完毕！！！");
});