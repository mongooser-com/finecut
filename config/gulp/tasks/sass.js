module.exports = function() {
    G.gulp.task('sass', () => {
        return G.gulp.src  ( G.path.engine.style.sass + '**/*.{scss,sass}' )
                    .pipe ( G.sourcemap.init() )
                    .pipe ( G.sass() )
                    .on	  ( 'error', err => { return { title: 'Sass', message: err.message } } )
                    .pipe ( G.autoprefixer({ browsers: ['last 5 versions'], cascade: false }) )
                    .pipe ( G.postcss(
                            [ G.cssSorting({ "properties-order" : "alphabetical"}) ]))
                    .pipe ( G.sourcemap.write('./sourcemaps/') )
                    .pipe ( G.gulp.dest( G.path.engine.style.css ) );
    });
    
    
}