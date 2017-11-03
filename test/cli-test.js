'use strict';

const assert = require('assert');
const childProcess = require('child_process');
const pify = require('pify');
const logSymbols = require('log-symbols');

describe('cli', () => {
  it('should show results for fast script', async () => {
    const stdout = await pify(childProcess.execFile)('../bin/cli.js', ['../test/fixtures/fast-script.js', '--color'], { cwd: __dirname });
    assert.equal(stdout.trim(), `${logSymbols.success} Thread is not busy :)`);
  });

  it('should show results for slow script', async () => {
    const stdout = await pify(childProcess.execFile)('../bin/cli.js', ['../test/fixtures/slow-script.js', '--color'], { cwd: __dirname });
    assert.equal(stdout.trim(), `${logSymbols.error} Thread is busy :( Try to use WebWorkers to let thread free.`);
  });

  it('should work with custom url', async () => {
    const stdout = await pify(childProcess.execFile)('../bin/cli.js', ['../test/fixtures/fast-script.js', 'http://example.com', '--color'], { cwd: __dirname });
    assert.equal(stdout.trim(), `${logSymbols.success} Thread is not busy :)`);
  });
});
