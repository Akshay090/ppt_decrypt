const fs = require('fs');
const path = require('path');
const unzipper  = require("unzipper");
const zipFolder = require('zip-a-folder');

const decrypter = (fileName)=>{
    console.log('fileName '+ fileName)

    const current_dir = process.cwd();
    let pptx = path.join(current_dir, `${fileName}.pptx`);
    let zip = path.join(current_dir, `${fileName}.zip`);
    let temp_dir = path.join(current_dir, 'temp', fileName)
    let presentation_xml_path = path.join(temp_dir,'ppt','presentation.xml')
    console.log(presentation_xml_path)
    console.log(temp_dir)
    
    fs.rename(pptx, zip, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    fs.createReadStream(zip)
    .pipe(unzipper.Extract({ path: temp_dir }));

    fs.readFile(presentation_xml_path, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/<p:modifyVerifier[^>]+>/g, '');
      
        fs.writeFile(presentation_xml_path, result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
      });

      zipFolder.zipFolder(temp_dir, zip, function(err) {
        if(err) {
            console.log('Something went wrong!', err);
        }
    });

     fs.rename(zip, pptx, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
   
}
module.exports = decrypter;