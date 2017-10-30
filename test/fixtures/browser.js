'use strict';

module.exports = {
	nodeRequireArgs: {}.toString.call(require('../..')(arguments)),
	nodeRequireNoArgs: {}.toString.call(require('../..')())
};
