const Organization = require('../model/organization');

exports.getCourse = async (req, res) => {
    try{
        const course = await Organization.findOne({_id: req.user.id}).select({_id: 0, course: 1});
        return res.status(200).send(course)
    }
    catch(err) {
        return res.status(400).send(err); 
    }
}

exports.updateCourse = async (req, res) => {
    try{
        await Organization.updateOne({_id: req.user.id}, {course: req.body.course});
        return res.status(200).send({message: 'success'})
    }
    catch(err) {
        return res.status(400).send(err); 
    }
}
