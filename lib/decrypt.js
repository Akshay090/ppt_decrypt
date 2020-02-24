const utils = require("../lib/utils");
const path = require("path");
const cliProgress = require("cli-progress");

const decrypter = async fileName => {
  //   console.log("fileName " + fileName);

  const current_dir = process.cwd();
  let pptx = path.join(current_dir, `${fileName}.pptx`);
  let zip = path.join(current_dir, `${fileName}.zip`);
  let temp_dir = path.join(current_dir, "temp", fileName);
  let presentation_xml_path = path.join(temp_dir, "ppt", "presentation.xml");

  // create a new progress bar instance and use shades_classic theme
  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  // start the progress bar with a total value of 100 and start value of 0
  bar1.start(100, 0);

  try {
    //rename pptx to zip
    await utils.renameFile(pptx, zip);
    bar1.update(10);

    //unzip zip file to temp dir
    await utils.unzipToDir(zip, temp_dir);
    bar1.update(20);

    //remove verifier from xml
    await utils.replaceWithRegex(
      presentation_xml_path,
      /<p:modifyVerifier[^>]+>/g,
      ""
    );
    bar1.update(30);

    //temp dir to zip
    await utils.zipDir(temp_dir, zip);
    bar1.update(40);

    //rename zip to pptx
    await utils.renameFile(zip, pptx);
    bar1.update(50);

    //delete temp folder
    await utils.rimraf(path.join(current_dir, "temp"));
    bar1.update(100);
  } catch (error) {
    console.error(error);
  } finally {
    bar1.stop();
  }
};
module.exports = decrypter;
