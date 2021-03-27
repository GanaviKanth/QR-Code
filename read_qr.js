var Jimp = require("jimp");
var fs = require('fs')
var qrCode = require('qrcode-reader');
var path = require('path');

run().catch(error => console.error(error.stack));

async function run() {
    const img = await Jimp.read(fs.readFileSync('./qrImage.png'));

    const qr = new qrCode();

    // qrcode-reader's API doesn't support promises, so wrap it
    const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
        qr.decode(img.bitmap);
    });
    console.log(value.result);
}