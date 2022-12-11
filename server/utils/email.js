import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
const sendEmail = async ({ emailFrom, emailTo, subject, message, resetURL }) => {

    let testAccount = await createTestAccount()

    let transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" < ${emailFrom}>`, // sender address
        to: `${emailTo}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${message}`, // plain text body
        html: `<b>Reset Password Link is here</b><li>${resetURL}</li>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info));
}
export default sendEmail;