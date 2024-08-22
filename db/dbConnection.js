// import mysql from "mysql2";

// export const dbConnection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "anurag7587709264@#$%shukla",
//   database: "ecom",
//   port: "3306"
// });


// // Handle connection errors
// dbConnection.on('error', (err) => {
//   console.error('MySQL Pool Error:', err);
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     handleDisconnect();
//   } else {
//     throw err;
//   }
// });

// function handleDisconnect() {
//   dbConnection.end(err => {
//     if (err) {
//       console.error('Error ending MySQL pool:', err);
//     }
//     console.log('Reconnecting to MySQL...');
//     // Recreate the pool
//     pool = mysql.createPool(dbConfig);
//   });
// }










import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('ecom', 'root', 'anurag7587709264@#$%shukla', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Export the sequelize instance
export default sequelize;










// // import mongoose from "mongoose";

// // export const dbConnection = async () => {
// //     try {
// //         await mongoose.connect(process.env.MONGODB);
// //         console.log("Connected to Database");
// //     } catch (error) {
// //         console.log("Error", error);
// //     }
// // }

