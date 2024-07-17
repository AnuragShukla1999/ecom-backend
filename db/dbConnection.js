

import mysql from "mysql";

export const dbConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "anurag7587709264@#$%shukla",
    databaseName: "crud",
    port: "3308"
});



// export const dbConnection = async () => {
//     try {
//         const connection = await mysql.createConnection({
//             host: "127.0.0.1",
//             user: "root",
//             password: "anurag7587709264@#$%shukla",
//             databaseName: "crud"
//         });

//         // Execute query
//         const [rows, fields] = await connection.execute('SELECT * FROM users');

//         console.log(rows); // Example: logging retrieved rows

//         // Close connection
//         await connection.end();

//     } catch (error) {
//         console.error('Error executing MySQL query:', error);
//     }
// }






// // import mongoose from "mongoose";

// // export const dbConnection = async () => {
// //     try {
// //         await mongoose.connect(process.env.MONGODB);
// //         console.log("Connected to Database");
// //     } catch (error) {
// //         console.log("Error", error);
// //     }
// // }

