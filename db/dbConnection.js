

// import mysql from "mysql";

// export const dbConnection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "anurag7587709264@#$%shukla",
//     databaseName: "xyz"
// });



import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error", error);
    }
}