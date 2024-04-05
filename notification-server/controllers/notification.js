const nodemailer = require("nodemailer");
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'jominrajeshk@gmail.com',
        pass:'qjvu xgqj hnuw zywp'
    }
})

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('../views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('../views/'),
};

transporter.use('compile', hbs(handlebarOptions))


exports.sendNotification = async (res,req,next) => {

    const mailOptions = {
        from:'"Bucket" <bucket.com>',
        to: req.query.email,
        subject:'New File shared with you in Bucket',
        context:{
            name:req.query.email,
            filename:req.query.filename,
            sender:req.query.user
        }
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).end()
      } catch (error) {
        console.log(`Nodemailer error sending email`, error);
      }

}