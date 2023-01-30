const { body } = require('express-validator');
function validateRegister() {
    return [
        body('email').not().isEmpty().withMessage("Required Field").isEmail().withMessage("Must be type email").normalizeEmail(),
        body('organization_name').not().isEmpty().withMessage("Required Field").trim().escape(),
        body('organization_id').not().isEmpty().withMessage("Required Field").trim().escape(),
        body('wallet_address').not().isEmpty().withMessage("Required Field").trim().escape(),
        body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/gm).withMessage("Must contain one Upper, Lower, No, SPchar"),
        body('rePassword').custom((value, {req}) => {
            if(value !== req.body.password)
            throw new Error('Password confirmation does not match password');
            return true;
        })
    ]
}

function validateLogin(){
    return [
        body('email').not().isEmpty().withMessage("Required Field").isEmail().withMessage("Must be type email").normalizeEmail(),
        body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/gm).withMessage("Must contain one Upper, Lower, No, SPchar")
    ]
}

module.exports = {validateRegister, validateLogin};
