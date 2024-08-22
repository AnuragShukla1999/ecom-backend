// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     productName: String,
//     brandName: String,
//     category: String,
//     productImage: [],
//     description: String,
//     price: Number,
//     sellingPrice: Number
// });

// const productModel = mongoose.model("product", productSchema);

// export default productModel;




import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnection.js'; 

const Product = sequelize.define('Product', {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'products', // Specify the table name
    timestamps: true // Add createdAt and updatedAt fields
});

export default Product;
