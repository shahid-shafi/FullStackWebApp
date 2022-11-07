import email from 'emailjs'
export const sendEmailJS = async () => {

    // const client = new SMTPClient({
    //     user: 'shahidshafi.ics@gmail.com',
    //     password: 'Shahid1234',
    //     host: 'smtp.gmail.com',
    //     ssl: true,
    // });

    // try {
    //     const message = await client.sendAsync({
    //         text: 'i hope this works',
    //         from: 'you <shahid@ics.com>',
    //         to: 'someone <shahidshafi.ics@gmail.com>, another <another@gmail.com>',
    //         cc: 'else <else@gmail.com>',
    //         subject: 'testing emailjs',
    //     });
    //     console.log(message);
    // } catch (err) {
    //     console.error(err);
    // }

    var server = email.server.connect({
        user: 'shahidshafi.ics@gmail.com',
        password: 'Shahid1234',
        host: 'smtp.gmail.com',
        ssl: true
    });

    server.send({
        text: 'Hey howdy',
        from: 'NodeJS',
        to: 'Shahid <shahidshafi.ics@gmail.com>',
        cc: '',
        subject: 'Greetings'
    }, function (err, message) {
        console.log(err || message);
    });
}