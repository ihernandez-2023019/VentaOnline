import Product from './product.model.js'
 
// Crear un producto
export const createProduct = async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(
            {
                success: true,
                message: 'Product created',
                product
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
 
// Obtener todos los productos
export const getProducts = async (req, res) => {
    try{
        const products = await Product.find()
        if(products.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Products is empty'
                }
            )
        }
        res.send(
            {
                success: true,
                message: 'Products founded',
                products
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
 
// Obtener un producto por ID
export const getProductById = async (req, res) => {
    try{
        let { id } = req.params
        let product = await Product.findById(id)
        if (!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        res.send(
            {
                success: true,
                message: 'Product found',
                product
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
 
// Actualizar un producto
export const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if(!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        res.send(
            {
                success: true,
                message: 'Product Updated',
                product
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
 
// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try{
        let id = req.params.id
        let product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        res.send(
            {
                success: true,
                message: 'Producto eliminado correctamente',
                product
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

// Obtener productos agotados
export const getOutOfStockProducts = async (req, res) => {
    try{
        const products = await Product.find(
            {
                stock: 0
            }
        )
        if(products.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'There is not products with not stock'
                }
            )
        }
        res.send(
            {
                success: true,
                message: 'Products with not stock',
                products
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

// Obtener productos más vendidos
export const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort(
            {
                sold: -1
            }
        )
        .limit(5)
        res.send(
            {
                success: true,
                message: 'Most selling products',
                products
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