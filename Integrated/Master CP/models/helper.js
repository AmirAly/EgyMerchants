var fileService = require('azure-storage')
        .createBlobService('egmpre', 'U7rnqj67eTUWBhYD5xBfSLrxc21jIpuHeRPKzr9GrOlXa485konFwcvMEnYz2Ohe1h84Vs/EPs5BxbsMPRHcAw==');

module.exports = {
    sendEmail: function (email) {
        var smtpTransport = nodemailer.createTransport({
            transport: "SMTP",
            host: 'appout.co',
            secureConnection: false,
            port: 110,
            requiresAuth: true,
            auth: {
                user: 'ucare@appout.co',
                pass: 'uc12uc'
            }
        });
        var mailOptions = {
            to: email.to,
            subject: email.subject,
            html: email.text
        }
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                return err;
            }
            else
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

