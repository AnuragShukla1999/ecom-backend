// import mongoose from "mongoose";

// const addToCartSchema = new mongoose.Schema({
//     productId: {
//         ref: 'product',
//         type: String,
//     },
//     quantity: Number,
//     userId: String,
// },
// {
//     timestamps: true
// });

// const addToCartModel = mongoose.model("addToCart", addToCartSchema);

// export default addToCartModel;




import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnection.js';

const AddToCart = sequelize.define('AddToCart', {
  productId: {
    type: DataTypes.STRING, 
    allowNull: false,  
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'add_to_cart',
  timestamps: true
});

export default AddToCart;
