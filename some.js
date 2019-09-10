const modules = {
	gulp          : require('gulp'),
	sass          : require('gulp-sass'),
	autoprefixer  : require('gulp-autoprefixer'),
	sourcemap     : require('gulp-sourcemaps'),
	postcss       : require('gulp-postcss'),
	cssSorting    : require('postcss-sorting'),
	SASS_PATH     : './sass/',
	CSS_PATH      : './../stylesheets',
};

exports.modules = modules;