
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dce2oozza', 
    api_key: '245386291529646',
    api_secret: 'HoxadU9ZcgWxIREdqb45QzDJo-I' 
});

module.exports = {
    uploadImage: function (_name) {
        cloudinary.uploader.upload(_name, function (result) {
            console.log(result)
        }, { public_id: _name });
    },
    getImage: function (_name) {
        cloudinary.url(_name);
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

