let { body, validationResult } = require('express-validator')
let constants = require('./constants')
let util = require('util')
const { CreateAnUser } = require('../controllers/users')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler')


let options = {
    password:{
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    username:{
        minLength: 6
    }
}

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            CreateErrorResponse(res, 400, errors.array())
        } else {
            next();
        }
    },
    SignUpValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME,options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    LoginValidator: [
        body("username").isLength(options.username).withMessage("username hoac password sai"),
        body("password").isStrongPassword(options.password).withMessage("username hoac password sai")
    ],
    ChangePassValidator:[
        body("oldpassword").isLength(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,options.password.minLength,options.password.minLowercase,options.password.minUppercase,options.password.minNumbers,options.password.minSymbols)),
        body("newpassword").isLength(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,options.password.minLength,options.password.minLowercase,options.password.minUppercase,options.password.minNumbers,options.password.minSymbols))
    ],
    ForgotPassword:[
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    ResetPassword:[
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,options.password.minLength,options.password.minLowercase,options.password.minUppercase,options.password.minNumbers,options.password.minSymbols))
    ],
    UserValidator:[
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME,options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body("role").isIn(['user', 'admin']).withMessage(constants.VALIDATOR_ERROR_ROLE)
    ]
}
// multer