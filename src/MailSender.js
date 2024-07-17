const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    sendEmail(targetEmail, content){
        const message = {
            from: 'Music App',
            to: targetEmail,
            subject: 'Ekspor playlist',
            text: 'Terlampir hasil dari export playlist',
            attachments: [
                {
                    filename: 'playlist.json',
                    content,
                }
            ]
        }

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;