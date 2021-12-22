import express, { request } from "express";
import { MongoClient } from "mongodb";


const app=express()
const PORT=4500;

app.use(express.json());

const users=[
    {"id":"100",
    "username":"rakesh kumar",
    "email":"rakesh567@gmail.com",
    "password":"password@123"
},{
    "id":"101",
    "username":"prakash kumar",
    "email":"prakash587@gmail.com",
    "password":"welcome@123"
},{
    "id":"103",
    "username":"murali",
    "email":"murali007@gmail.com",
    "password":"hello@123"
},{
    "id":"104",
    "username":"manoj kumar",
    "email":"manojmass@gmail.com",
    "password":"home@123"
},{
    "id":"105",
    "username":"vasudhevan",
    "email":"vasu001@gmail.com",
    "password":"vasu0123"
},{
    "id":"106",
    "username":"nivetha",
    "email":"nivetharaj@gmail.com",
    "password":"nive@143",
}
]

const MONGO_URL="mongodb://localhost";
// connecting monogodb ///
async function newconnection(){
    const client= new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Connected ");
    return client
}
const client=await newconnection();

// building server //
app.get("/",(request,response)=>{
    response.send("hello world")
})

// getting all data using /users ///
app.get("/users",(request,response)=>{
    response.send(users);
})

// filter username using request.query //
app.get("/users",async(request,response)=>{
    console.log(request.query)
    const filter=request.query;
    console.log(filter);
    const filtername=await client.db("bwd28").collection("users").find(filter).toArray();
    response.send(filtername);
})

// getting user by id ///
app.get("/users/:id",async(request,response)=>{
    const {id}=request.params;
    const user=await client.db("bwd28").collection("users").findOne({id:id})
    console.log(user)
    user?response.send(user)
    : response.send({message:"User not found"})
})


// create users by post method //
app.post("/users",async(request,response)=>{
    const data=request.body;
    console.log(data);
    const newuser=await client.db("bwd28").collection("users").insertOne(data);
    response.send(newuser);
});
app.listen(PORT,()=>console.log("app runing in",PORT));


