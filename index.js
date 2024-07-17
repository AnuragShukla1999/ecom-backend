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
    console.log(`database is connnected at ${process.env.PORT}`);
});



// dbConnection.connect(() => {
//     console.log("Database is connected")
// })


dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

