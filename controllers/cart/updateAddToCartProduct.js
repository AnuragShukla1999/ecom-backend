import { dbConnection } from "../../db/dbConnection.js";



export const updateAddToCartProduct = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ message: 'userId, productId, and quantity are required' });
    }

    try {
        const [result] = await dbConnection.promise().query(
            'UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?',
            [quantity, userId, productId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        res.json({ message: 'Product quantity updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}