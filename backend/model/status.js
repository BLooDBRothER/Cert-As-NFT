const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const Schema = mongoose.Schema;

const statusSchema = new Schema(
    {
        organization_id: {
            type: Schema.Types.ObjectId,
            ref: "organization",
            unique: true
        },
        status: {
            type: String,
            enum: ["pending", "verified", "rejected"]
        },
        updated_at: {
            type: Date,
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

statusSchema.pre('save', function(next){
    this.updated_at = Date.now();
    console.log(this.updated_at);
    next();
})

module.exports = mongoose.model('Status', statusSchema);
