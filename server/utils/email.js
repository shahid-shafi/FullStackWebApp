import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async ({ email, subject, message, resetURL }) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    console.log("Before TestAccount")
    let testAccount = await createTestAccount()
    console.log("After TestAccount")

    // create reusable transporter object using the default SMTP transport
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
        from: '"Fred Foo 👻" <shahidshafi.org@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${message}`, // plain text body
        html: `<b>Reset Password Link is here</b><li>${resetURL}</li>`, // html body
    });
    
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info));
}
export default sendEmail;