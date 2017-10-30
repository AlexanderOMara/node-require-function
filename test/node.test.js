'use strict';

const path = require('path');
const childProcess = require('child_process');

const tape = require('tape');
const lib = require('..');

const moduleArgs = arguments;

tape('node', t => {
	try {
		const nodeRequireArgs = lib(moduleArgs);
		const nodeRequireNoArgs = lib();

		t.equal(typeof nodeRequireArgs, 'function', 'Args gets function');
		t.equal(typeof nodeRequireNoArgs, 'function', 'No args gets function');
		t.notEqual(nodeRequireArgs, nodeRequireNoArgs, 'Different function');

		const fs = nodeRequireNoArgs('fs');
		t.ok(fs, 'Required the fs module');

		t.end();
	}
	catch (err) {
		t.end(err);
	}
});

tape('node mjs', async t => {
	try {
		const nodeVersion = process.versions.node;
		const nodeVersions = nodeVersion.split('.').map(Number);

		// Check if this version of Node supports modules.
		if (
			nodeVersions[0] < 8 ||
			(nodeVersions[0] === 8 && nodeVersions[0] < 5)
		) {
			t.skip(`Skipping MJS test, Node ${nodeVersion} < 8.5`);
			t.end();
			return;
		}

		// Run the MJS module, enabling the experimental modules.
		const result = await new Promise((resolve, reject) => {
			childProcess.execFile(
				process.execPath,
				[
					'--experimental-modules',
					path.join(__dirname, 'fixtures/mjs/node.mjs')
				],
				(err, stdout, stderr) => {
					if (err) {
						reject(err);
						return;
					}
					resolve({
						stdout: stdout,
						stderr: stderr
					});
				}
			);
		});
		const data = JSON.parse(result.stdout);

		const functionString = {}.toString.call({}.toString);
		const objectString = {}.toString();

		t.equal(data.nodeRequire, functionString, 'Require function');
		t.equal(data.fs, objectString, 'Required fs');

		t.end();
	}
	catch (err) {
		t.end(err);
	}
});
