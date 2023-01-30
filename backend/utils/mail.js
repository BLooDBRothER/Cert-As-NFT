const sgMail = require('../configs/mail');
const Organization = require('../model/organization');

function sendEmail(mailOpts) {

    const mailOptions = {...mailOpts, from: process.env.FROM_MAIL}
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

async function sendVerificationEmail(organization, req, res){
    try{
        const token = organization.generateVerificationToken();
        const subject = "Account Verification Token";
        const to = organization.email;
        const link= `http://localhost:5173/verify?token=${token}`;
        const html = `<p>Hi ${organization.email}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;


        sendEmail({to, subject, html});
        const organization_ = await setResendTime(organization.email, res);

        console.log(organization_);

        res.status(200).json({"message": 'A verification email has been sent to your E-Mail.', resend_time: organization_.resend_time});
    }catch (error) {
        console.log(error)
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

module.exports = sendVerificationEmail;
