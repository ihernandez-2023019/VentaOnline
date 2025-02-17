import Categories from "./categories.model.js"

export const saveCategorie = async(req, res)=>{
    try{
        let data = req.body
        let categorie = new Categories(data)
        await categorie.save()
        return res.send(
            {
                success: true,
                message: `Categorie saved successfully`,
                total: categorie
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

export const getCategories = async(req, res)=>{
    try {
        const { limit = 20 , skip = 0} = req.query
        //Consultar
        const categories = await Categories.find()
            .skip(skip)
            .limit(limit)
        if(categories.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Categories is empty'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Categories founded: ',
                categories
            }
        )
    } catch (err) {
        console.error('General error'. err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const getCategorie = async(req, res)=>{
    try{
        //obtener el id del Producto a mostrar
        let { id } = req.params
        let categorie = await Categories.findById(id)

        if(!categorie) return res.status(404).send(
            {
                success: false ,
                message: 'Categorie not found'
            }
        )
        return res.send(
            {
                success: true ,
                message: 'Categorie found: ',
                categorie
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

export const editCategorie = async(req, res)=>{
    try{
        let id = req.params.id
        let data = req.body
        let categorie = await Categories.findByIdAndUpdate(
            id, 
            data,
            {
                new: true
            }
        )
        if(!categorie) return res.status(404).send(
            {
                success: false,
                message: 'Categorie not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Categorie update: ', categorie
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

export const deleteCategorie = async(req, res)=>{
    try{
        let id = req.params.id
        let categorie = await Categories.findByIdAndDelete(id)
        if(!categorie) return res.status(404).send(
            {
                success: false,
                message: 'Animal not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Animal Deleted: ', id
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', err
            }
        )
    }
}