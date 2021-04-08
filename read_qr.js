var Jimp = require("jimp");
var fs = require('fs')
var qrCode = require('qrcode-reader');
var path = require('path');
//const app = express();
//run().catch(error => console.error(error.stack));

async function run(val) {

    const img = await Jimp.read(fs.readFileSync(val));

    const qr = new qrCode();

    // qrcode-reader's API doesn't support promises, so wrap it
    const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
        qr.decode(img.bitmap);
    });
    console.log(value.result)
    //return (value.result);
}

module.exports = { run };