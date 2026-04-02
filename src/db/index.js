import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI
        if (!mongoUri) {
            console.log("MONGODB_URI not set, skipping DB connection")
            return
        }

        // If URI already has a database (ends with /something), use as is
        const uri = mongoUri.endsWith('/') ? mongoUri + DB_NAME : mongoUri

        const connectionInstance = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
        })
        console.log(`Connected to MongoDB: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection ERROR:", error)
        // Do not exit, allow app to run without DB
    }
}

export default connectDB