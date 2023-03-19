const Organization = require('../model/organization');
const fs = require('fs')
// @route api/setting/personal
exports.getProfile = async (req, res) => {
    try{
        const { id } = req.user;
        const organization = await Organization.findOne({_id: id}).select({_id: 0, email: 1, organization_name: 1, wallet_address: 1, link: 1, organization_logo: 1});
        console.log(organization);
        return res.status(200).send(organization);
    }
    catch(err) {
        return res.status(400).send(err); 
    }
}

exports.uploadProfilePic = async (req, res) => {
    console.log(req.body.old_image)
    try{
        if(req.body.old_image)
            fs.unlinkSync(`public/logos/${req.body.old_image}`);
        const { id } = req.user;
        await Organization.updateOne({_id: id}, {organization_logo: req.file.filename});
        return res.status(200).send({logo: req.file.filename});
    }
    catch(err){
        console.log(err)
        return res.status(500).send('error');
    }
}

exports.updateProfile = async (req, res) => {
    try{
        await Organization.updateOne({_id: req.user.id}, req.body.data);
        return res.status(200).send({message: 'success'});
    }
    catch(err){
        console.log(err)
        return res.status(500).send('error');
    }
}

exports.removeProfilePic = async (req, res) => {
    try{
        fs.unlinkSync(`public/logos/${req.body.image}`);
        const { id } = req.user;
        await Organization.updateOne({_id: id}, {organization_logo: ''});
        return res.status(200).send({message: 'success'});
    }
    catch(err){
        console.log(err)
        return res.status(500).send('error');
    }
}
