import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import mongoose from "mongoose";


import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("ERROR", error);
    // Start server even if DB fails
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT || 8000} (DB connection failed)`);
    });
  });
  dotenv.config({ path: "./.env" })
console.log("URI:", process.env.MONGODB_URI) // ← check what's loaded

/*
const app  = express()



;(async()=>{
try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",()=>{
        console.log("ERROR",error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })

}
catch(error){
    console.error("ERROR", error)
    throw error
}



})()*/
