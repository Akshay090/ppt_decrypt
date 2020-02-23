const fs = require("fs");
const fsP = require("fs").promises;

const path = require("path");
const unzipper = require("unzipper");
const zipFolder = require("zip-a-folder");
const rimraf = require("rimraf");


exports.renameFile = (initial, final) => {
  return new Promise(function(resolve, reject) {
    fs.rename(initial, final, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve("success");
      }
    });
  });
};

exports.unzipToDir = (source, destination) => {
  return new Promise(function(resolve, reject) {
    const stream = fs
      .createReadStream(source)
      .pipe(unzipper.Extract({ path: destination }));
    stream.on("error", function(err) {
      console.log("error", err);
      reject(err);
    });
    stream.on("close", function() {
      resolve("success");
    });
  });
};

exports.replaceWithRegex = async (location, regex, txt_to_replace) => {
  try {
    const Filedata = await fsP.readFile(location, "utf8");
    const result = Filedata.replace(regex, txt_to_replace);
    await fsP.writeFile(location, result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.zipDir = (source, destination) => {
  return new Promise(function(resolve, reject) {
    zipFolder.zipFolder(source, destination, function(err) {
      if (err) {
        console.log("Something went wrong zipDir!", err);
        reject(err);
      } else {
        resolve("success");
      }
    });
  });
};

exports.rimraf = path => {
  return new Promise(function(resolve, reject) {
    rimraf(path, function(err) {
      if (err) {
        console.log("Something went wrong rimraf!", err);
        reject(err);
      } else {
        resolve("success");
      }
    });
  });
};
