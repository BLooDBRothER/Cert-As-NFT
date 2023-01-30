const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Organization = require('../model/organization');
const sendVerificationEmail = require('../utils/mail');
const { validationResult } = require('express-validator');

dotenv.config();

// @route POST api/auth/register
exports.register = async (req, res, next) => {
    try{
        console.log('endpoint', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const organization = await Organization.findOne({email: req.body.email});

        if(organization) return res.status(409).json({"message": "organization already exist"})
        const data = req.body;
        const newOrganization = new Organization({email: data.email, password: data.password, organization_name: data.organization_name, organization_id: data.organization_id, wallet_address: data.wallet_address, isVerified: false, status: 'pending'})
        
        const organization_ = await newOrganization.save();

    
        sendVerificationEmail(organization_, req, res)
    }
    catch (error){
        console.log(error)
        res.status(500).json({"message": "server error"})
    }
}

// @route GET api/auth/verifymail
exports.verifyMail = async (req, res) => {
    console.log(req.params);
    const { token } = req.params
    let payload;
    try {
        console.log(process.env.JWT_SECRET);
        payload = jwt.verify(
           token,
           process.env.JWT_SECRET
        );
    } catch (err) {
        console.log(err)
        return res.status(400).send(err);
    }
    console.log(payload)
    try{
        const organization = await Organization.findOne({_id: payload.id});
        if(!organization) return res.status(400).send({"message": "Invalid request"});
        
        await Organization.updateOne({_id: organization._id}, {isVerified: true});

        const jsonToken = organization.generateJwt();

        res.cookie("jwt", jsonToken, {secure: true, sameSite:"none", httpOnly: true});

        return res.status(200).json({"message": 'E-Mail verified successfully.\nYour account is being reviewed and let you know once approved.'});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({"message": "server error"})
    }
}

// @route GET api/auth/resend
exports.resendMail = async (req, res) => {
    const { email } = req.query;
    const organization = await Organization.findOne({email});
    console.log(organization);
    if(!organization){
        return res.status(404).json({"message": "No account found"});
    }
    if(organization.isVerified){
        return res.status(409).json({"message": "E-Mail already verified"});
    }
    if(!organization.canResend()){
        return res.status(400).json({"message": "Please wait", "resend_time": organization.resend_time});
    }

    sendVerificationEmail(organization, req, res)
}

// @route api/auth/login

// @method GET
exports.verifyLogin = (req, res) => {
    console.log(req.user)
    return res.status(200).send({message: "Logged in", email: req.user.email});
}

// @method POST
exports.login = async (req, res) => {
    try{
        const organization = await Organization.findOne({email: req.body.email});

        if(!organization || !organization.comparePassword(req.body.password)){
           return res.status(400).send({"message": "E-Mail or Password incorrect"});
        }

        if(!organization.isVerified){
            return res.status(401).send({"message": "E-Mail is not verified", resend_time: organization.resend_time});
        }
    
        // if(organization.status === "pending"){
        //     return res.status(403).send({"message": "Your account is being reviewed and let you know once approved."});
        // }
    
        const jsonToken = organization.generateJwt();
        console.log(jsonToken);
    
        res.cookie("jwt", jsonToken, {secure: true, sameSite:"none", httpOnly: true});
    
        return res.status(200).send({"message": "Logged in successfullt", email: organization.email}) 
    }
    catch (error){
        console.log(error);
        return res.status(500).json({"message": "server error"});
    }
}

// @route api/auth/logout
exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    return res.status(200).json({"message": "Logged out"});
}
