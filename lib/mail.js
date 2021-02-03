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
            user: init.info.email,
            clientId: '165775929348-mgj8g6ks7p3ba3tmmls7glvjrthnju9r.apps.googleusercontent.com',
            clientSecret: 'KUbWBNzKds49bEw72HDuYAHm',
            refreshToken: '1//044RxHsLIvZkqCgYIARAAGAQSNwF-L9Ir0WGgFJBb6EcYgXYRaSP7eX4FL5WSDqF8wqDh9t1dFU8XjIXECwaIyAknOugua60IRKg',
            accessToken: 'ya29.a0AfH6SMDk2ytPhijXDseuocxRyofiZ9RYDLLxkcbg4APeR_rPmO_7e-FLDjv9G7YccZrd4_69VZYQGvs2vdwmeWriA4foYPG4tm4W5cymKiyhXbcBpx9SFnh5Q0_tmqyFG_UNMp2fYt5cXkgAGqn_mJG6u4XIBbQ1regVBFfRsR8'
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
        //console.log(`mail have sent to ${ to }`);
    } catch (error) {
        console.error(error);
    }
}
module.exports=sendMail;
//sendMail('msj159@naver.com', 'Test Mail', '<p>Awsome! nodemailer do the trick!</p>');
