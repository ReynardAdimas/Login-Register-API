import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

const dbUrl = process.env.DB_URL
const connection = () => {
    mongoose.connect(dbUrl, {
      dbName: process.env.DB_NAME
    })
    const connection = mongoose.connection
    connection.on('error', console.error.bind(console, 'connection error :'))
    connection.once('open', () => {
      console.log('Server Connected')
    })

}
export default connection

