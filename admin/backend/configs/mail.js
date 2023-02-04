const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sgMail;
