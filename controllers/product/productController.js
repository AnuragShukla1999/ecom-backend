// import productModel from "../../models/productModel.js"

import { dbConnection } from "../../db/dbConnection.js";



// export const uploadProduct = async (req, res) => {
//     try {
//         const uploadProduct = new productModel(req.body);

//         const savedProduct = await uploadProduct.save();


//         res.status(201).json({
//             message: "Product Uploaded successfully",
//             data: savedProduct
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message : error.message
//         })
//     }
// };



// export const getProduct = async (req, res) => {
//     try {
//         const allProduct = await productModel.find().sort({ createdAt: -1 });

//         if (!allProduct) {
//             return res.status(401).json({
//                 message: "Product not found"
//             })
//         }

//         res.status(201).json({
//             message: "All product founded",
//             product: allProduct
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// };



// export const getProductById = async (req, res) => {
//     try {
//         const singleProduct = await productModel.findById(req.productId);

//         if (!singleProduct) {
//             return res.status(401).json({
//                 message: "product not founded"
//             })
//         };

//         res.status(201).json({
//             message: "Product founded",
//             product: singleProduct
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// }



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
    const { name, price, description  } = req.body;

    if (!id) {
        return res.status(400).json({
            message: 'Product id is required'
        })
    };


    if (!name && !price && !description) {
        return res.status(400).json({ message: 'At least one field is required to update' });
      };


    const updatedProduct = [];
    const values = [];

    if (name) {
        updatedProduct.push('name = ?')
    }

    if (price) {
        updatedProduct.push('price = ?')
    }

    if (description) {
        updatedProduct.push('description = ?')
    };

    values.push(id);


    try {
        const [result] = await dbConnection.promise().query(
          `UPDATE products SET ${updatedProduct.join(', ')} WHERE id = ?`,
          values
        );
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json({ id, name, price, description });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}