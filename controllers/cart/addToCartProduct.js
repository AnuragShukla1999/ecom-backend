import { dbConnection } from "../../db/dbConnection.js";


export const addToCartProduct = async (req, res) => {

    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'userId, productId, and quantity are required' });
    };

    try {
        const [result] = await dbConnection.promise().query(
            'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)',
            [userId, productId, quantity]
        );

        res.status(201).json({ message: 'Product added to cart', insertId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}