import { body } from "express-validator"
import { validateErrors , validateErrorsWithoutFiles} from "./validate.errors.js"
import { existEmail, existUsername , notRequiredField, notRequiredRoleField} from "../utils/db.validators.js"


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updateUserAdminValidator = [
    body('name')
        .optional()
        .notEmpty()
        .toLowerCase(),
    body('surname')
        .optional()
        .notEmpty()
        .toLowerCase(),
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase(),
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username , req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, { req })=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]

export const updateUserClientValidator = [
    body('name')
        .optional()
        .notEmpty()
        .toLowerCase(),
    body('surname')
        .optional()
        .notEmpty()
        .toLowerCase(),
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username , req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, { req })=> existEmail(email, req.user)),
    body('phone')
        .optional()
        .notEmpty(),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('rol')
        .optional()
        .notEmpty()
        .custom(notRequiredRoleField),
    validateErrorsWithoutFiles
]