// import { dbConnection } from "../../db/dbConnection.js";

import AddToCart from "../../models/cartModel";


// export const addToCartProduct = async (req, res) => {

//     const { userId, productId, quantity } = req.body;

//     if (!userId || !productId || !quantity) {
//         return res.status(400).json({ message: 'userId, productId, and quantity are required' });
//     };

//     try {
//         const [result] = await dbConnection.promise().query(
//             'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)',
//             [userId, productId, quantity]
//         );

//         res.status(201).json({ message: 'Product added to cart', insertId: result.insertId });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     } 
// }




export const addToCartProduct = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ message: 'userId, productId, and quantity are required' });
    }

    try {
        // Use upsert to handle insert or update
        const [cartItem, created] = await AddToCart.upsert({
            userId,
            productId,
            quantity
        }, {
            returning: true // Needed to get the returned instance
        });

        res.status(created ? 201 : 200).json({
            message: created ? 'Product added to cart' : 'Product quantity updated',
            cartItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}