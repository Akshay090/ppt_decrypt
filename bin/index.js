#!/usr/bin/env node

const decrypt = require("../lib/decrypt");

var arguments = process.argv.splice(2);
let fileName = arguments[0]

decrypt(fileName)