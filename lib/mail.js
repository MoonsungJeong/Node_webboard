const nodemailer = require('nodemailer');
const init = require("../init.js");

const sendMail = async (to, subject, html) => {
    const
    googleTransport = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: init.email.address,
            clientId: init.email.clientId,
            clientSecret: init.email.clientSecret,
            refreshToken: init.email.refreshToken,
            accessToken: init.email.accessToken
        }  
    }),
    mailOptions = {
        from: 'Kangaroo Admin <admin@kangaroo.com>',
        to,
        subject,
        html
    }
 
    try {
        await googleTransport.sendMail(mailOptions);
 
        googleTransport.close();
    } catch (error) {
        console.error(error);
    }
}
module.exports=sendMail;
//sendMail('cat@gmail.com', 'Test Mail', '<p>Awsome! nodemailer do the trick!</p>');
