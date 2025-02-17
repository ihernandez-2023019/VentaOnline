import { Router } from "express"
import {
    registerAdmin,
    registerClient,
    login
} from './auth.controller.js'
import { registerValidator } from '../../middlewares/validators.js'


const api = Router()

api.post('/registerAdmin',
    [
        registerValidator,
    ],
    registerAdmin
)
api.post('/registerClient',
    [
        registerValidator,
    ],
    registerClient
)
api.post('/login', login)

export default api