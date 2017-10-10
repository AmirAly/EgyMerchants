
var fs = require('fs');
var cloudinary = require('cloudinary');
var nodemailer = require('nodemailer')

cloudinary.config({
    cloud_name: 'dce2oozza',
    api_key: '245386291529646',
    api_secret: 'HoxadU9ZcgWxIREdqb45QzDJo-I'
});

module.exports = {
    uploadImage: function (_url, callback) {
        console.log("url is "+_url)
        cloudinary.v2.uploader.upload(_url, function (error, result)
         { 
             if(error) console.log(error);
             else {
             console.log("url  inside function is "+result.secure_url)
             callback(result.secure_url)
            }
         });
         
    },
    uploadMultipleImages: function (_url, callback) {
        var secureUrls = [];
        var i = 0;
        //this condition added as the expoes floor coordinates images has url but items pictures has img in schema
        if (_url[0].URL) {
            function uploadeurl(i) {
                if (i < _url.length) {
                    cloudinary.v2.uploader.upload(_url[i].URL, function (error, result) {
                        if (error) { console.log(error); }
                        else {
                            secureUrls.push(result.secure_url);
                            uploadeurl(i + 1);
                            console.log("secureUrls is"+secureUrls);
                        }
                    })
                }
                else {
                    callback(secureUrls);
                }
            }
            uploadeurl(0);
            }
        else {
            function uploadeimg(i) {
                if (i < _url.length) {
                    cloudinary.v2.uploader.upload(_url[i].Img, function (error, result) {
                        if (error) {   console.log(error); }
                        else {
                            secureUrls.push(result.secure_url);
                            uploadeimg(i + 1);
                            console.log("secureUrls is"+secureUrls);
                        }
                    })
                }
                else {
                    callback(secureUrls);
                }
            }
            uploadeimg(0);
           
            }
    },
    uploadMultipleImages1: function (_url, callback) {
        var secureUrls = [];
        for (var i = 0; i < _url.length; i++) {
            if (_url[i].URL) {
                cloudinary.v2.uploader.upload(_url[i].URL, function (error, result) {
                    if (result) {
                        secureUrls.push(result.secure_url);
                        if (secureUrls.length == _url.length) {
                            callback(secureUrls);
                        }
                    }
                });
            }
            else {
                cloudinary.v2.uploader.upload(_url[i].Img, function (error, result) {
                    if (result) {
                        secureUrls.push(result.secure_url);
                        console.log(secureUrls);
                        console.log(i);
                        if (secureUrls.length == _url.length) {
                            callback(secureUrls);
                        }
                    }
                });
            }
        }

    },
    sendEmail: function (email) {
        var smtpTransport = nodemailer.createTransport({
            transport: "SMTP",
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 587,
            requiresAuth: true,
            auth: {
                user: 'aali.ibtekar@gmail.com',
                pass: '2682013AmirAmira'
            }
        });
        var mailOptions = {
            to: email.to,
            subject: email.subject,
            html: email.html
        }
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                return err;
            }
            else
                console.log("mail sent");
            return 100;
        });
    },
    addDays: function (_date, _days) {
        var dat = new Date(_date);
        dat.setDate(dat.getDate() + _days);
        return dat;
    },
    postFile: function (_base64, _filename) {
        var base64 = require('base64-stream');
        var stream = require('stream');

        var decoder = base64.decode();
        var input = new stream.PassThrough();
        var output = new stream.PassThrough();

        input.pipe(decoder).pipe(output);

        output.on('data', function (data) {
            fileService.createBlockBlobFromText('egmpre', _filename, data, {
                contentType: 'image/png',
                contentEncoding: 'base64'
            }, function (error, result, response) {
                if (error) {
                    console.log(error);
                    return false;
                }
                return true;
            });
        });
        input.write(_base64);
    },
    getWeekStart: function (_date) {
        var d = new Date(_date);
        var day = d.getDay(),
            diff = d.getDate() - day;//+ (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
}

