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
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions))


exports.sendNotification = async (req,res,next) => {

    const mailOptions = {
        from:'"Bucket" <bucket.com>',
        template: "email",
        to: req.query.email,
        subject:'New File shared with you in Bucket',
        context:{
            name:req.query.email,
            filename:req.query.filename,
            sender:req.query.sender
        }
    }

    try {
        await transporter.sendMail(mailOptions);
        res.send({message:'endpoint reached'})
        res.status(200).end()
      } catch (error) {
        console.log(`Nodemailer error sending email`, error);
        res.send({message:'error while sending '})
        res.status(400).end()

      }

}