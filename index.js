import express from "express";


const app=express()
const PORT=4500;

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


app.get("/",(request,response)=>{
    response.send("hello world")
})

app.get("/users",(request,response)=>{
    response.send(users);
})
app.get("/users/:id",(request,response)=>{
    const {id}=request.params;
    const user=users.filter(us=>us.id===id)
    console.log(user)
    user?response.send(user)
    : response.send({message:"User not found"})
})

app.get("/users",(request,response)=>{
    const{username}=request.query;
    const filtername=users.filter((us)=>us.username===username);
    response.send(filtername);
})


app.listen(PORT,()=>console.log("app runing in",PORT));


