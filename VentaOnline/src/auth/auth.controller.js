import User from '../user/user.model.js'
import { encrypt } from '../../utils/encryp.js'
import { checkPassword } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const registerAdmin = async(req, res)=>{
    try{
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.send(
            {
                success: true,
                message: `Register succesfully, can be logged with username: 
                ${user.username}`
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with registration user',
                err
            }
        )
    }
}

export const registerClient = async(req, res)=>{
    try{
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.rol = 'CLIENT'
        await user.save()
        return res.send(
            {
                success: true,
                message: `Register succesfully, can be logged with username: 
                ${user.username}`
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with registration user',
                err
            }
        )
    }
}

export const login = async(req, res)=>{
    try{
        let { userLogin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLogin},
                    {username: userLogin}
                ]
            }
        )
        console.log(user)
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                rol: user.rol
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({meessage: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}