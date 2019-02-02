'use strict';

const log = require('./log');

const uncaughtExceptionHandler = (error) => {
	log.error(error);
};

process.on('uncaughtException', uncaughtExceptionHandler);

process.off('uncaughtException', uncaughtExceptionHandler);
