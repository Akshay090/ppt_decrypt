const utils = require("../lib/utils");
const path = require("path");

const decrypter = async fileName => {
  //   console.log("fileName " + fileName);

  const current_dir = process.cwd();
  let pptx = path.join(current_dir, `${fileName}.pptx`);
  let zip = path.join(current_dir, `${fileName}.zip`);
  let temp_dir = path.join(current_dir, "temp", fileName);
  let presentation_xml_path = path.join(temp_dir, "ppt", "presentation.xml");

  try {
    //rename pptx to zip
    let rename_res = await utils.renameFile(pptx, zip);
    console.log(rename_res);

    //unzip zip file to temp dir
    await utils.unzipToDir(zip, temp_dir);

    //remove verifier from xml
    await utils.replaceWithRegex(
      presentation_xml_path,
      /<p:modifyVerifier[^>]+>/g,
      ""
    );

    //temp dir to zip
    await utils.zipDir(temp_dir, zip);

    //rename zip to pptx
    await utils.renameFile(zip, pptx);

    //delete temp folder
    // await utils.rimraf(path.join(current_dir));
    
  } catch (error) {
    console.error(error);
  }
};
module.exports = decrypter;
