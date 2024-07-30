import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbConnection } from "./db/dbConnection.js";


import userRoute from './routes/userRoutes.js'

dotenv.config();

const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM student";
//     dbConnection.query(sql, (err, result) => {
//         if (err) return res.json({ Message: "Error inside server" })
//     })
// });

app.get('/home', (req, res) => {
    return res.send("Hello Guys")
})

app.use('/api', userRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
});



dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return; // Exit early to avoid further issues
    }
    console.log('Connected to MySQL database');

    // Create database if it does not exist
    dbConnection.query("CREATE DATABASE IF NOT EXISTS ecom", (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            return; // Exit early to avoid further issues 
        }
        console.log("Database created or already exists");
    });
})


// dbConnection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database: ');
//         return;
//     } else {
//         console.log('Connected to MySQL database as id ');
//     }
// });

