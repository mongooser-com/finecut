'use strict';

const ioc = require('./mods/ioc');

const modules = {};

// order dependent loader, sync
[
	// express + app
	'app',
	'httpServer',
	'repl',
	'errors',

].forEach(name => {

	modules[name] = require(`./mods/${name}`);
	ioc.set('modules', modules);

});

// routes, sync
[

	// main routes
	'engine',

	// additional routes modules
	'modules',

].forEach(name => {
	require(`./routes/${name}`);
});


// Start Me !
process.emit('sayToRun', 'startHTTPServer');
