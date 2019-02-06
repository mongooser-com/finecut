'use strict';

global.G = {
	tasks         : require('./config/gulp/tasks/tasks'),

	gulp          : require('gulp'),
	sass          : require('gulp-sass'),
	autoprefixer  : require('gulp-autoprefixer'),
	sourcemap     : require('gulp-sourcemaps'),
	postcss       : require('gulp-postcss'),
	cssSorting    : require('postcss-sorting'),

	path          : {
		engine    : {
			style     : {
				sass     : './engine/dev/sass/',
				css      : './engine/stylesheets'
			}
		}
	}
	
}

G.tasks.forEach( module => {
	require(module)();
})