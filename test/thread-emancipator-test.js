'use strict';

const assert = require('assert');
const ThreadEmancipator = require('../thread-emancipator');

describe('Thread emancipator', () => {
  let threadEmancipator;

  it('when url isn\'t set', () => {
    threadEmancipator = new ThreadEmancipator({ scriptPath: './test/fixtures/fast-script.js' });
    assert.equal(threadEmancipator.url, 'https://www.google.com');

  });

  it('when url is set', () => {
    threadEmancipator = new ThreadEmancipator({ url: 'http://example.com', scriptPath: './test/fixtures/fast-script.js' });
    assert.equal(threadEmancipator.url, 'http://example.com');
  });

  it('when thread isn\'t busy', async () => {
    threadEmancipator = new ThreadEmancipator({ scriptPath: './test/fixtures/fast-script.js' });
    const isThreadFree = await threadEmancipator.evaluate();
    assert.ok(isThreadFree);
  });

  it('when thread is busy', async () => {
    threadEmancipator = new ThreadEmancipator({ scriptPath: './test/fixtures/slow-script.js' });
    const isThreadFree = await threadEmancipator.evaluate('./test/fixtures/slow-script.js');
    assert.ok(!isThreadFree);
  });

  describe('exceptions', () => {
    it('should process failing script', async () => {
      try {
        threadEmancipator = new ThreadEmancipator({ scriptPath: './test/fixtures/failing-script.js' });
        await threadEmancipator.evaluate('./test/fixtures/failing-script.js');
        assert.fail();
      } catch (error) {
        assert.ok(/Evaluation failed:/.test(error.message));
      }
    });

    describe('process missed scriptPath', () => {
      it('when scriptPath is absent', () => {
        try {
          threadEmancipator = new ThreadEmancipator();
          assert.fail();
        } catch (error) {
          assert.equal(error.message, 'scriptPath is required');
        }
      });

      it('when scriptPath is empty string', () => {
        try {
          threadEmancipator = new ThreadEmancipator({ scriptPath: '' });
          assert.fail();
        } catch (error) {
          assert.equal(error.message, 'scriptPath is required');
        }
      });
    });
  });
});