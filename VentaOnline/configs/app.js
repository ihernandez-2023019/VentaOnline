'use strick'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import categorieRoutes from '../src/categories/categories.routes.js'
import productRoutes from '../src/product/product.routes.js'
import KartRoutes from '../src/Shopping Kart/kart.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/v1/user', authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/categorie', categorieRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/kart', KartRoutes)
}

export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runnin in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}