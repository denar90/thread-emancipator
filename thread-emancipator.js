'use strict';

const fs = require('fs');
const path = require('path');
const pify = require('pify');
const puppeteer = require('puppeteer');

const idle = 50;
const url = 'https://www.google.com';

module.exports = class ThreadEmancipator {
  constructor(options = {}) {
    if (options.scriptPath && options.scriptPath.length) {
      this.scriptPath = options.scriptPath;
    } else {
      throw new Error('scriptPath is required');
    }
    this.url = options.url || url;
  }

  async evaluate() {
    const scriptData = await pify(fs.readFile)(path.resolve(this.scriptPath), 'utf8');
    const script = this.addMeasurements(scriptData);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.url);
    const executionContext = page.mainFrame().executionContext();
    try {
      const perfResults = await executionContext.evaluate(script);
      const scriptIdle = perfResults[0].duration;
      await browser.close();
      return idle > scriptIdle;
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  addMeasurements(script) {
    return 'performance.mark("start");' +
      script +
      'performance.mark("end");' +
      'performance.measure("measure", "start", "end");' +
      'performance.getEntriesByName("measure");';
  }
};