'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const os = require('os');



var args = require("minimist")(process.argv.slice(2),{ string: 'file' });


//Routes
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/download', function(req, res){
  var file = __dirname + '/' + args.file;

  res.download(file); // Set disposition and send it.

});

//args



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
