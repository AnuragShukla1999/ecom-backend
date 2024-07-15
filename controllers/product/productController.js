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
}