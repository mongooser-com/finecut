module.exports = function() {
	G.gulp.task('default', function() {
		G.gulp.watch( G.path.engine.style.sass + '**/*.{scss,sass}', G.gulp.series('sass') );
	});
}