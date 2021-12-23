import { client } from "./index.js";
import bcrypt from "bcrypt";

//edit user//
 async function updateuserbyId(data) {
    return await client.db("bwd28").collection("users").updateOne({ id: id }, { $set: data });
}
//delete user by id//
 async function deleteuserbyId(id) {
    return await client.db("bwd28").collection("users").deleteOne({ id: id });
}

//create users//
 async function createusers(data) {
    return await client.db("bwd28").collection("users").insertMany(data);
}
//get user by id//
 async function getuserbyId(id) {
    return await client.db("bwd28").collection("users").findOne({ id: id });
}
// to filter username//
async function getuserfiltered(filter) {
    return await client.db("bwd28").collection("users").find(filter).toArray();
}

//to store password//
async function createuser(data) {
    return await client.db("bwd28").collection("user").insertOne(data);
} 

// to avoid already existing username //
async function getuserbyname(email) {
    return await client.db("bwd28").collection("user").findOne({ email:email });
}

 
async function genpassword(password){
    const no_of_rounds=10;
    const salt=await bcrypt.genSalt(no_of_rounds)
    console.log(salt)
    const hashedpassword=await bcrypt.hash(password,salt)
    return hashedpassword
}
genpassword("password5791")



export{
    getuserfiltered, 
    getuserbyId, 
    createusers, 
    deleteuserbyId, 
    updateuserbyId,
    genpassword,
    createuser,
    getuserbyname
}