'use strict';

const path = require('path');

const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const browserRunner = require('./browser-runner');
const tape = require('tape');

tape('webpack', async t => {
	try {
		// Create UMD Webpack bundle.
		const bundleCode = await new Promise((resolve, reject) => {
			const compiler = webpack({
				entry: path.resolve(__dirname, './fixtures/browser'),
				output: {
					library: 'browser',
					libraryTarget: 'umd',
					filename: 'browser.js',
					path: '/'
				}
			});
			compiler.outputFileSystem = new MemoryFs();
			compiler.run((err, stats) => {
				if (err) {
					reject(err);
					return;
				}
				if (stats.hasErrors()) {
					reject(stats.compilation.errors[0]);
					return;
				}
				resolve(
					compiler.outputFileSystem.data['browser.js']
						.toString('utf8')
				);
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
