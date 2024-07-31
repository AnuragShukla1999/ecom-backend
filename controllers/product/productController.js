
import { dbConnection } from "../../db/dbConnection.js";


export const getAllProduct = async (req, res) => {
    try {
        const [rows] = await dbConnection.promise().query('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const [rows] = await dbConnection.promise().query('SELECT * FROM products WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




export const uploadProduct = async (req, res) => {
    const { name, price, description } = req.body;


    if (!name || !price || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await dbConnection.promise().query(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description]
        );

        res.status(201).json({ id: result[0], name, price, description });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!id) {
        return res.status(400).json({
            message: 'Product id is required'
        })
    };


    if (!name && !price && !description) {
        return res.status(400).json({ message: 'At least one field is required to update' });
    };
    
    try {
        const [result] = await dbConnection.promise().query(
            'UPDATE products SET name = COALESCE(?, name), description = COALESCE(?, description), price = COALESCE(?, price) WHERE id = ?',
            [name, description, price, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updateProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
}