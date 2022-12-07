import { createTransport } from 'nodemailer'

export class MailerServices {
    constructor() { }

    static async send(message: string, to: string) {
        try {
            const transporter = createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            })
            const mail = await transporter.sendMail({
                to,
                subject: 'TEST',
                html: message,
            })

            return mail

        } catch (error) {
            console.log(error)
        }
    }
}