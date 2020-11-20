import nodemailer from 'nodemailer';

export async function sendEmail(to, html){
    // let testAccount = await nodemailer.createTestAccount();
    // console.log("test account", testAccount);

    let transporter =  nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {          
            user: 'bj6n4xfymxhxwem2@ethereal.email', //generated from test account
            pass: 'hyuFdKEGYUvrJtn3Z4' //generated from test account
        }
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to,
        subject: 'Change password',
        html
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}