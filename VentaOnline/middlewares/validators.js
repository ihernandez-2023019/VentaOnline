import { body, param } from "express-validator"
import { validateErrors , validateErrorsWithoutFiles} from "./validate.errors.js"
import { existEmail, existUsername , notRequiredField, notRequiredRoleField, existProductName} from "../utils/db.validators.js"


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
    validateErrorsWithoutFiles
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
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredRoleField),
    validateErrorsWithoutFiles
]

export const validateProduct = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(existProductName),
    body('brand', 'Brand cannot be empty')
        .notEmpty(),
    body('price', 'Price cannot be empty')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser mayor a 0'),
    body('stock', 'Stock cannot be empty')
        .isInt({ min: 0 })
        .withMessage('El stock no puede ser negativo'),
    body('categorie')
        .isMongoId()
        .withMessage('Categoría inválida'),
    validateErrorsWithoutFiles
]

export const validateUpdateProduct = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom((name, { req })=> existProductName(name , req.product)),
    body('brand', 'Brand cannot be empty')
        .notEmpty(),
    body('price', 'Price cannot be empty')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser mayor a 0'),
    body('stock', 'Stock cannot be empty')
        .isInt({ min: 0 })
        .withMessage('El stock no puede ser negativo'),
    body('categorie')
        .isMongoId()
        .withMessage('Categoría inválida'),
    validateErrorsWithoutFiles
]

export const validateAddToCart = [
    body("userId")
        .isMongoId()
        .withMessage("Usuario inválido"),
    body("productId")
        .isMongoId()
        .withMessage("Producto inválido"),
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Cantidad inválida"),
    validateErrorsWithoutFiles
]

export const validateGetCart = [
    param("userId")
        .isMongoId()
        .withMessage("Usuario inválido")
];

export const validateRemoveFromCart = [
    body("userId")
        .isMongoId()
        .withMessage("Usuario inválido"),
    body("productId")
        .isMongoId()
        .withMessage("Producto inválido")
];

export const validateUpdateCartItem = [
    body("userId")
        .isMongoId()
        .withMessage("Usuario inválido"),
    body("productId")
        .isMongoId()
        .withMessage("Producto inválido"),
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Cantidad inválida")
];