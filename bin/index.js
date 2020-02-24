#!/usr/bin/env node
const path = require("path");

const decrypt = require("../lib/decrypt");

var arguments = process.argv.splice(2);
let file = arguments[0];
let fileName = path.normalize(file).split(".")[0];
let fileExt = path.normalize(file).split(".")[1];
console.log('path',path.normalize(file));
console.log('fileExt',fileExt);

if (fileExt === "pptx") {
    decrypt(fileName);
} else {
  console.log("Please select PPPTX extension file only");
}
