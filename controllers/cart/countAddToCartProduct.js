import { dbConnection } from "../../db/dbConnection.js";



export const countAddToCartProduct = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    try {
        const [count] = await dbConnection.promise().query(
            'SELECT COUNT(*) AS count FROM cart WHERE userId = ?',
            [userId]
        );
        res.json({ count: count[0].count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}