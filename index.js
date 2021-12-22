import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.js";


dotenv.config();

const app=express();

// server running under port-4500 //
const PORT=process.env.PORT

app.use(express.json());

// to hide MONGO_URL using dotenv pacakage //
const MONGO_URL=process.env.MONGO_URL;

// connecting monogodb ///
async function newconnection(){
    const client= new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Connected ");
    return client
}
export const client=await newconnection();

// building server //
app.get("/",(request,response)=>{
    response.send("hello world")
})

app.use("/users",userRouter)

app.listen(PORT,()=>console.log("app runing in",PORT));



