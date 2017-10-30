'use strict';

const puppeteer = require('puppeteer');

module.exports = async function(bundleCode) {
	// Open a headless browser to a dummy page.
	const browser = await puppeteer.launch({
		headless: true
	});
	const page = await browser.newPage();
	await page.goto('about:blank');

	// Wrap the bundle to get the exports of the UMD bundle.
	const code = ('(' + (function() {
		const exports = {};
		const module = {
			exports: exports
		};
		__BUNDLE_CODE__; // eslint-disable-line no-undef,no-unused-expressions
		return JSON.stringify(module.exports);
	}) + ')()').replace('__BUNDLE_CODE__', '\n' + bundleCode + '\n');

	// Run that string of code on the page.
	const r = await page.evaluate(code);

	// Close the browser now.
	browser.close();

	// Return the resulting data.
	return JSON.parse(r);
};
