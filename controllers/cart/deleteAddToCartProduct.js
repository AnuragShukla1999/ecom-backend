import { dbConnection } from "../../db/dbConnection.js";



export const deleteAddToCartProduct = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'userId and productId are required' });
    }

    try {
        const [result] = await dbConnection.promise().query(
            'DELETE FROM cart WHERE userId = ? AND productId = ?',
            [userId, productId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}