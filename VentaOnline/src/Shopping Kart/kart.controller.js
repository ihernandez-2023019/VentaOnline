import Cart from "./kart.model.js";
import Product from "../product/product.model.js";

// Agregar producto al carrito
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        const product = await Product.findById(productId);
        if (!product) return res.status(404).send({ success: false, message: "Product not found" })
        if (product.stock < quantity) return res.status(400).send({ success: false, message: "Insufficient stock" })

        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = new Cart({ user: userId, items: [{ product: productId, quantity }] })
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            } else {
                cart.items.push({ product: productId, quantity })
            }
        }

        await cart.save();
        res.status(200).send({ success: true, message: "Product added to cart", cart })
    } catch (err) {
        console.error("General error", err)
        res.status(500).send({ success: false, message: "General error", err })
    }
}

// Obtener carrito de compras
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product")
        if (!cart) return res.status(404).send({ success: false, message: "Cart is empty" })

        res.send({ success: true, message: "Cart found", cart })
    } catch (err) {
        console.error("General error", err)
        res.status(500).send({ success: false, message: "General error", err })
    }
}

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body
        let cart = await Cart.findOne({ user: userId })

        if (!cart) return res.status(404).send({ success: false, message: "Cart not found" })

        cart.items = cart.items.filter(item => item.product.toString() !== productId)
        await cart.save()

        res.send({ success: true, message: "Product removed from cart", cart })
    } catch (err) {
        console.error("General error", err)
        res.status(500).send({ success: false, message: "General error", err })
    }
};

// Actualizar cantidad de un producto en el carrito
export const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (quantity < 1) return res.status(400).send({ success: false, message: "Invalid quantity" })

        let cart = await Cart.findOne({ user: userId })
        if (!cart) return res.status(404).send({ success: false, message: "Cart not found" })

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) return res.status(404).send({ success: false, message: "Product not found in cart" })

        const product = await Product.findById(productId)
        if (!product) return res.status(404).send({ success: false, message: "Product not found" })
        if (product.stock < quantity) return res.status(400).send({ success: false, message: "Insufficient stock" })

        cart.items[itemIndex].quantity = quantity
        await cart.save()

        res.send({ success: true, message: "Cart item updated", cart })
    } catch (err) {
        console.error("General error", err)
        res.status(500).send({ success: false, message: "General error", err })
    }
}
