'use strict';

const highlight = require('cli-highlight').highlight;
const chalk = require('chalk');
const fs = require('fs');

const util = require('util');

const mongoose = require('mongoose');

const SOCKET_FILE_PATH = require('path')
	.join(process.cwd(), 'tmp/repl.sock');

const HISTORY_FILE_PATH = require('path')
	.join(process.cwd(), 'tmp/repl.hist');


const repl = require('repl-sockets');
const dive = require('context-dive');

const ioc = require('./ioc');

const p = {
	get e() {
		process.exit(0);
		return undefined;
	},
	get c() {
		process.stdout.write('\x1Bc');
		return 'done';
	}
};


const inspect = () => {
	require('inspector').open();
	return 'done';
};


const toStdout = process.stdout.write.bind(process.stdout);
const makePrint = (str, printNumbers) => {
	var num = 0;
	str = str.split('\n').map(part => {
		num++;
		return `${printNumbers ? num : ''}\t${part}`;
	}).join('\n');

	toStdout('\n');
	toStdout(highlight(str, {
		language: 'javascript',
		theme: {
			keyword: chalk.blue,
			string: chalk.green,
			function: chalk.yellow
		}
	}));
	toStdout('\n');
	return 'done';
};


const print = (ptr, clear = true) => {
	if (!ptr) {
		return 'missing pointer';
	}

	if (clear) {
		toStdout('\x1Bc');
	}

	var str;
	if (typeof ptr === 'function') {
		str = ptr.toString();
	} else {
		str = util.inspect(ptr);
	}

	return makePrint(str);
};

const printFile = (filename, clear = true) => {

	const resolvedName = require.resolve(`../${filename}`);
	if (resolvedName instanceof Error) {
		return 'file does not exists';
	}

	if (clear) {
		toStdout('\x1Bc');
	}

	return makePrint(fs.readFileSync(resolvedName).toString(), 1);
};

const context = {

	p,

	inspect,
	ioc,
	
	mods: ioc.get('modules'),

	get context() {
		return context;
	},
	
	repl: {},

	print,
	printFile,
	makePrint,

	exit() {
		process.exit(0);
	}
	
};

repl
	.server(SOCKET_FILE_PATH, {

		context,

		historyPath: HISTORY_FILE_PATH

	}, (socket, _repl) => {

		context.repl.instance = _repl;
		context.repl.socket = socket;

		_repl.prompt();

	});


// context.repl.socket.write(ptr.toString());
// process._rawDebug(util.inspect(ptr.toString()));
