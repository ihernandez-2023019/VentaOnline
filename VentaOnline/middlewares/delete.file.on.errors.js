import { unlink } from 'fs/promises'
import { join } from 'path'

//Middleware de eliminar
export const deleteFileOnError = async(error, req, res, next)=>{
    console.log(req.file, req.filePath)
    
    if(req.file && req.filePath){
        const filePath = join(req.filePath, req.file.filename)
        try{
            await unlink(filePath)
        }catch(unlinkErr){
            console.error('Error deleting file', unlinkErr)
        }
    }
    if(error.status === 400 || error.errors){
        return res.status(400).send(
            {
                seccess: false,
                message: 'Error restering user',
                error
            }
        )
    }
    return res.status(500).send(
        {
            success: false,
            message: error.message
        }
    )
}