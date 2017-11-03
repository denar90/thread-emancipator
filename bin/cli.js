#!/usr/bin/env node
'use strict';

const logSymbols = require('log-symbols');
const meow = require('meow');
const threadEmancipator = require('../');

const commandName = 'thread-emancipator';
const cli = meow(`
	Usage
	  ${commandName} <scriptPath> <url>
	Examples
	  ${commandName} ./js/my-slow-script
	  ${logSymbols.error} Thread is busy :( Try to use WebWorkers to let thread free.
	  ${commandName} ./js/my-awesome-fast-script-working-with-web-workers
	  ${logSymbols.success} Thread is not busy :)
	Exits with code 0 when the name is available or 2 when taken
`);

(async () => {
	const isThreadBusy = await threadEmancipator(cli.input[0]);
	console.log(isThreadBusy ? `${logSymbols.success} Thread is not busy :)` : `${logSymbols.error} Thread is busy :( Try to use WebWorkers to let thread free.`);
	process.exit(0);
})();
