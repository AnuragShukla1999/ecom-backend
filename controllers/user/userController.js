import userModal from "../../models/userModel";



export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const user = await userModal.findOne({ email });

        console.log("User", user);

        if (user) {
            throw new Error("User already exist")
        };


        if (!email || !password) {
            res.status(401).json({
                message: "Please Provide email or password"
            })
        }
    } catch (error) {
        
    }
}