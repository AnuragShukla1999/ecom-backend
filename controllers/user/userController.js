import userModal from "../../models/userModel";
import bcryptjs from "bcryptjs";


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
        };
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new userModal({ name, email, password: hashedPassword })
        try {
            await newUser.save();
            res.status(201).json({
                message: "User created successfully"
            })
        } catch (error) {
            console.log("Error", error)
        }
    } catch (error) {
        console.error("Error", error);
    }
}