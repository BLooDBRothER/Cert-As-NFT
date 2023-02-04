const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            require: 'E-Mail is required',
            trim: true
        },
        password: {
            type: String
        },
        organization_name:{
            type: String,
            trim: true
        },
        organization_id: {
            type: String,
            trim: true,
            unique: true
        },
        phone:{
            type: Number
        },
        status: {
            type: String,
            enum: ["pending", "verified", "rejected"]
        },
        wallet_address:{
            type: String,
            trim: true
        },
        isVerified:{
            type: Boolean
        },
        resend_time:{
            type: Date
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

organizationSchema.pre('save', function(next){
    const organization = this;

    if(organization.password && organization.isModified('password')){
        organization.password = bcrypt.hashSync(organization.password, 10);
    }

    next();
})

organizationSchema.methods.canResend = function(){
    const now = new Date();
    return this.resend_time <= now.getTime();
}

organizationSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

organizationSchema.methods.generateJwt = function(){
    const now = new Date();
    const expiration = new Date();

    let payload = {
        id: this._id,
        email: this.email,
    }
    console.log(payload);

    const jwtToken = jwt.sign(payload, process.env['JWT_SECRET'], {
        expiresIn: 24*60*60
    });
    
    return jwtToken;
}

organizationSchema.methods.generateVerificationToken = function (){
    const now = new Date();

    let payload = {
        id: this._id
    }
    console.log(payload);

    const jwtToken = jwt.sign(payload, process.env['JWT_SECRET'], {
        expiresIn: 5*60
    });
    
    return jwtToken;
}

module.exports = mongoose.model('Organization', organizationSchema);
