import lib from '../../..';

const nodeRequire = lib();
const fs = nodeRequire ? nodeRequire('fs') : null;

const objectToString = {}.toString;

console.log(JSON.stringify({
	nodeRequire: objectToString.call(nodeRequire),
	fs: objectToString.call(fs)
}));
