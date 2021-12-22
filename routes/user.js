import express from "express";
import {
    getuserfiltered, 
    getuserbyId, 
    createusers, 
    deleteuserbyId, 
    updateuserbyId } from "../helper.js";

const router=express.Router();

// filter username using request.query //
router.route("/")
.get(async(request,response)=>{
    console.log(request.query)
    const filter=request.query;
    console.log(filter);
    const filtername=await getuserfiltered(filter);
    response.send(filtername);
})
.post(async(request,response)=>{
    const data=request.body;
    console.log(data);
    const newuser=await createusers(data);
    response.send(newuser);
});// create users by post method //

// getting user by id ///
router.route("/:id")
.get(async(request,response)=>{
    const {id}=request.params;
    const user=await getuserbyId(id)
    console.log(user)
    user?response.send(user)
    : response.send({message:"User not found"})
})
.delete(async(request,response)=>{
    const {id}=request.params;
    console.log(request.params)
    const deleteuser=await deleteuserbyId(id)
    deleteuser.deletedCount>0
    ? response.send(deleteuser)
    :response.status(404).send({message:"user not found"})
})// deleting particular users using delete method //
.put(async(request,response)=>{
    const data=request.body
    console.log(data)
    const result=await updateuserbyId(data)
    const User=await getuserbyId(id)
    response.send(User);
})// updating data //

export const userRouter=router