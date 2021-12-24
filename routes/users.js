import express from "express";
import { genpassword,createuser,getuserbyname } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router=express.Router();

//signup part//
// creating a password for user //
router.route("/signup").post(async(request,response)=>{
const {username,password,email}=request.body;
const userfromdb=await getuserbyname(email)
if(userfromdb){
    response.status(400).send({message:"Email already exist"})
    return;
}
if(password.length < 8){
    response.status(400).send({message:"password should be longer"})
    return;
}

const hashedpassword= await genpassword(password)
const result=await createuser({username,email,password:hashedpassword})

response.send(result);
});// create users by post method //


// login part//
router.route("/login").post(async(request,response)=>{
    const {email,password}=request.body;
    const userfromdb=await getuserbyname(email)
    if(!userfromdb){
        response.status(401).send({message:"Invalid credentials"})
        return;
    }
    const storedpassword=userfromdb.password
    console.log(storedpassword);

    const matchpassword=await bcrypt.compare(password,storedpassword)
    console.log(matchpassword)

    // generating jwt token //
    if(matchpassword){
        const token=jwt.sign({id:userfromdb._id},process.env.SECRET_KEY)
        response.send({message:"successful login",token:token})
        return;
    }else{
        response.send({message:"Invalid credentials"})
        return;
    }
  
})


export const usersRouter=router