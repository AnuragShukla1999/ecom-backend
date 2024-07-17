import userModal from "../../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { dbConnection } from "../../db/dbConnection.js";



// this is for mongoose 
// export const signup = async (req, res) => {
//     try {
//         const { email, password, name } = req.body;

//         const user = await userModal.findOne({ email });
//         console.log("User", user);
//         if (user) {
//             throw new Error("User already exist")
//         };
//         if (!email || !password) {
//             res.status(401).json({
//                 message: "Please Provide email or password"
//             }) 
//         };
//         const hashedPassword = bcryptjs.hashSync(password, 10);
//         const newUser = new userModal({ name, email, password: hashedPassword })
//         try {
//             await newUser.save();
//             res.status(201).json({
//                 message: "User created successfully"
//             })
//         } catch (error) {
//             console.log("Error", error)
//         }
//     } catch (error) {
//         console.error("Error", error);
//     }
// }





/// this is for mysql database
// export const signup = async (req, res) => {
//     const { email, password, name } = req.body;

//     try {
//         const hashedPassword = await bcryptjs.hashSync(password, 10);

//         const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        
//         await new Promise((resolve, reject) => {
//             dbConnection.query(sql, [name, email, hashedPassword], (err, result) => {
//                 if (err) {
//                     console.error("Error inserting user:", err);
//                     reject(err);
//                 } else {
//                     console.log("User registered successfully");
//                     resolve(result);
//                 }
//             });
//         });

//         res.status(201).json({ message: 'User registered successfully' });

//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }





export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({
                message: "Please enter your email and password"
            });
        } else {

            const sql = 'SELECT email FROM users WHERE email = ?'
            dbConnection.query(sql, [email], async (err, result) => {
                if (err) {
                    throw new Error(err);
                };

                if (result[1]) {
                    return res.json({
                        message: "Email has already been registered"
                    })
                } else {
                    const password = bcryptjs.hashSync(password, 10);
                    dbConnection.query('INSERT INTO users SET ?', { email: email, password: password, name }, (err, result) => {
                        if (err) {
                            throw new Error(err);
                        } else {
                            return res.status(201).json({
                                message: "User created successfully"
                            })
                        }
                    })
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}









// export const signin = async (req, res) => {

//     const { email, password } = req.body;
//     try {
//         const validUser = await userModal.findOne({ email });
//         if (!validUser) {
//             return res.status(401).json({
//                 message: "user not exist"
//             })
//         };
//         const validPassword = bcryptjs.compareSync(password, validUser.password);
//         if (!validPassword) {
//             return res.status(401).json({
//                 message: "Wrong Password"
//             })
//         };
//         const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.cookie('access_token', token).json({
//             message: "Sign in Successfully",
//             token,
//             validUser,
//             success: true
//         })
//     } catch (error) {
//         console.error(error)
//     }
// };



export const signin = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    
    dbConnection.query(sql, [email],  async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (result.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            // varify password 
            const isMatch = await bcryptjs.compareSync(password, result[0].password);

            if (!isMatch) {
                res.status(401).json({ message: 'Invalid credentials' });
            } else {
                const token = jwt.sign(
                    { id: result[0].id, email: result[0].email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
 
                res.status(200).json({ token });
            }
        }
    })
}



export const logout = async (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(201).json({
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in Logout Api"
        })
    }
};



export const userDetail = async (req, res) => {
    try {

        const sessionUser = req.userId;

        const { userId, email, name } = req.body;


        const payload = {
            ...( email && { email : email } ),
            ...( name && { name : name } )
        }

        const user = await userModal.findById(sessionUser);
        console.log("User", user);
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            });
        };

        const updateUser = await userModal.findByIdAndUpdate(userId, payload);

        res.status(201).json({
            data: updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};



export const allUsers = async (req, res) => {
    try {
        const allUsers = await userModal.find();
        if (!allUsers) {
            return res.status(401).json({
                message: "no user exist"
            })
        };
        res.status(201).json({
            message: "All Users Found"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}