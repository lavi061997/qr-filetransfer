'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const os = require('os');
const AdmZip = require('adm-zip');

//get args

var args = require("minimist")(process.argv.slice(2),{ string: 'file' });

//zip file function

function zip(zipFileName, path) {

    const zip = new AdmZip();

    zip.addLocalFolder(path, path);

    zip.writeZip(zipFileName);

    console.log("Done Zipping Now You Can Download");

}



//Routes
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/download', function(req, res){

    if(fs.existsSync(__dirname + "/temp.zip")){

        fs.unlink(__dirname + "/temp.zip");

    }
    if (fs.existsSync(args.file)) {


        if (fs.lstatSync(args.file).isDirectory() ) {
            console.log("This is a directory will be available for download after zipping the files");

            zip("temp.zip", args.file);

            res.download(__dirname + "/temp.zip");

        }
        else {
            console.log("File will be available for download shortly");
            res.download(args.file); // Set disposition and send it.
        }
    }

    else {
        console.log("not a valid file/path");
    }

});




//IP address
var ifaces = os.networkInterfaces();
var address = '';
function find_local_ip(val){

Object.keys(ifaces).forEach(function (ifname) {

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    if (ifname === "Wi-Fi") {
       address = "http://" + iface.address + ":" + "2277" + "/download";
       console.log(address);
    }
  });
});
}
find_local_ip();

qrcode.generate(address, function (qrcode) {
    console.log(qrcode);
});



app.listen(2277, () => console.log('Example app listening on port 2277!'))
