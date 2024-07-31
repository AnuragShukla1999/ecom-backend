import { dbConnection } from "../../db/dbConnection.js";



export const addToCartViewProduct = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    try {
        const [cartItems] = await dbConnection.promise().query(
            'SELECT c.*, p.name, p.description, p.price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.userId = ?',
            [userId]
        );
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}