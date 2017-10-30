'use strict';

const path = require('path');

const browserify = require('browserify');
const browserRunner = require('./browser-runner');
const tape = require('tape');

tape('browserify', async t => {
	try {
		// Create UMD Browserify bundle.
		const bundleCode = await new Promise((resolve, reject) => {
			let code = '';
			const b = browserify(
				path.resolve(__dirname, './fixtures/browser'),
				{
					standalone: 'browser'
				}
			).bundle();
			b.on('data', d => {
				code += d.toString('utf8');
			});
			b.on('end', () => {
				resolve(code);
			});
		});

		// Run that code in a real headless browser.
		const r = await browserRunner(bundleCode);

		const nullStr = {}.toString.call(null);
		t.equal(r.nodeRequireArgs, nullStr, 'Browser: Null with args');
		t.equal(r.nodeRequireNoArgs, nullStr, 'Browser: Null without args');

		t.end();
	}
	catch (err) {
		t.end(err);
	}
});
