# node-require-function

Get the real Node require function in Node, or null in browsers, without errors from bundlers.


## Overview

This package serves 2 main purposes.

### 1. Get the real `require` function only in Node.

When using a bundler like Webpack or Browserify, the `require` function is rewritten to call bundled code. This makes it cumbersome to dynamically include some modules only when run in Node.

If you first require this module, you can get the *real* Node `require` function without any bundling warnings or errors, and dynamically `require` any module you like and not have them bundled.

### 2. Use `require` in ES6 modules.

An ES6 module cannot use `require` function, however with this module it is possible to `import` a `require` function.

While ideally this should not be necessary, in some cases it may be useful.


## Usage

Just `require` or `import` the module to get the `getRequire` function. In a CommonJS module, it is also possible to supply the module-level `arguments` to get the require function from the module itself. When called, that function will return either the Node `require` function or `null`.

### Examples

Here are some examples showing how to get the native `fs` module, but *only* when run in Node.

Notes:
 - When run outside of Node, the `nodeRequire` function will be `null`.
 - The examples using `arguments` must be placed at the top level of the module.
 - When the `arguments` object is passed, the require function is the same as the module would normally use when in Node.
 - When the `arguments` object is not passed, the `require` function comes from this module itself, so the path will be different when requiring relative paths (leading `./` or `../`).

#### ES5 with arguments

```js
const nodeRequire = require('node-require-function')(arguments);

const fs = nodeRequire ? nodeRequire('fs') : null;
```

#### ES5 without arguments

```js
const nodeRequire = require('node-require-function')();

const fs = nodeRequire ? nodeRequire('fs') : null;
```

#### ES6

```js
import nodeRequireGet from 'node-require-function';

const nodeRequire = nodeRequireGet();

const fs = nodeRequire ? nodeRequire('fs') : null;
```


## Bugs

If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.


## License

Copyright (c) 2017 Alexander O'Mara

Licensed under the Mozilla Public License, v. 2.0.

If this license does not work for you, feel free to contact me.


## Donations

If you find my software useful, please consider making a modest donation on my website at [alexomara.com](http://alexomara.com).
