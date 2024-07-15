import productModel from "../../models/productModel.js"



export const uploadProduct = async (req, res) => {
    try {
        const uploadProduct = new productModel(req.body);

        const savedProduct = await uploadProduct.save();


        res.status(201).json({
            message: "Product Uploaded successfully",
            data: savedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
};



export const getProduct = async (req, res) => {
    try {
        const allProduct = await productModel.find().sort({ createdAt: -1 });

        if (!allProduct) {
            return res.status(401).json({
                message: "Product not found"
            })
        }

        res.status(201).json({
            message: "All product founded",
            product: allProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};



export const getProductById = async (req, res) => {
    try {
        const singleProduct = await productModel.findById(req.productId);

        if (!singleProduct) {
            return res.status(401).json({
                message: "product not founded"
            })
        };

        res.status(201).json({
            message: "Product founded",
            product: singleProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}