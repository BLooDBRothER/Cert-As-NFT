const sgMail = require('../configs/mail');
const Organization = require('../model/organization');

function sendEmail(mailOpts) {

    const mailOptions = {...mailOpts, from: process.env.FROM_MAIL}
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) {
                console.log(error);
                return reject(error)
            };
            return resolve(result);
        });
    });
}

async function sendStatusMail(email, status, res){
    try{
        const subject = "Account Review Status";
        const to = email;
        const statement = status === "verified" ? "You can Login now" : "Sorry we don't find valid data";
        const html = `<h1>Hi ${email}</h1><br><p>Your account were reviewed by our Admins and the stauts is <b>${status}</b><br>${statement}</p>`;


        sendEmail({to, subject, html});
        return;
    }catch (error) {
        console.log(error);
        return res.status(500).json({"message": "server error"})
    }
}

async function setResendTime(email, res){
    try{
        const now = new Date();
        now.setTime(now.getTime() + (2 * 60 * 1000));
        return await Organization.findOneAndUpdate({email}, {resend_time: now.getTime()}, {returnDocument: 'after'});
    }
    catch (error){
        return res.status(500).json({"message": "server error"})
    }
}

module.exports = sendStatusMail;
