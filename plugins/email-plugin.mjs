import { Plugins } from './plugin.mjs';
import dotenv from 'dotenv';

dotenv.config();

import nodemailer from 'nodemailer';

export class EmailPlugin extends Plugins {
    async validationChecks(form_id, response) {
        if(response.email == undefined) {
            throw new Error("Email field is required")
        }
    }

    async run(form_id, response, databaseResponse) {
        const email = response.email
        await sendEmail(form_id, email)
    }
}

async function sendEmail(form_id, email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASS,
        },
    });


    // Email options
    const mailOptions = {
    from: '', // email address of the sender
    to: email,
    subject: 'Form #' + form_id + ' Submission',
    text: 'Your data has been successfully recorded.',
    };

    // Send the email
    transporter.sendMail(mailOptions)
    .then(info => {
        console.log('Email sent:', info.response);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
}
