import express from "express";
import router from './routes/route.js'
import connection from "./connection.js"; 
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router); 
app.use(cors())
//     // request adalah untuk mengambil data data dari user 
//     // response adalah cara untuk mengembalikan apa yang diminta oleh user

// error handling 404 
app.use((req, res) => {
  res.status(404).json('404 NOT FOUND');
})

// connect to db
connection()

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
