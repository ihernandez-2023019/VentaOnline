import User from '../user/user.model.js'
import { checkPassword } from '../../utils/encryp.js'

export const getAdmins = async(req, res)=>{
    try {
        const { limit = 20 , skip = 0} = req.query
        //Consultar
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users is empty'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'User found: ',
                users
            }
        )
    } catch (err) {
        console.error('General error'. err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const getAdmin = async(req, res)=>{
    try{
        //obtener el id del Producto a mostrar
        let { id } = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false ,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true ,
                message: 'User found: ',
                user
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const editAdmin = async(req, res)=>{
    try{
        let id = req.params.id
        let data = req.body
        let user = await User.findByIdAndUpdate(
            id, 
            data,
            {
                new: true
            }
        )
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User update: ', user
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const editClient = async(req, res)=>{
    try{
        let id = req.params.id
        let data = req.body
        let user = await User.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            }
        )
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User update: ', user
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const deleteAdmin = async(req, res)=>{
    try{
        let { id } = req.params
        let { password } = req.body
        let admin = await User.findById(req.user.id)
        if(!admin) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        const equalPassword = await checkPassword(admin.password, password)
        if (!equalPassword) return res.status(400).send(
            {
                success: false,
                message: 'Incorrect password'
            }
        )
        let deleteUserWithPassword = await User.findByIdAndDelete(
            id,
            { password: password },
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'User Deleted: ',
                deleteUserWithPassword
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const deleteClient = async(req, res)=>{
    try{
        let id = req.params.id
        let { password } = req.body
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        const equalPassword = await checkPassword(user.password, password)
        if (!equalPassword) return res.status(400).send(
            {
                success: false,
                message: 'Incorrect password'
            }
        )
        let deleteUserWithPassword = await User.findByIdAndDelete(
            id,
            { password: password },
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'User Deleted: ',
                deleteUserWithPassword
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}