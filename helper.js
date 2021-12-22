import { client } from "./index.js";

 async function updateuserbyId(data) {
    return await client.db("bwd28").collection("users").updateOne({ id: id }, { $set: data });
}
 async function deleteuserbyId(id) {
    return await client.db("bwd28").collection("users").deleteOne({ id: id });
}
 async function createusers(data) {
    return await client.db("bwd28").collection("users").insertMany(data);
}
 async function getuserbyId(id) {
    return await client.db("bwd28").collection("users").findOne({ id: id });
}
 async function getuserfiltered(filter) {
    return await client.db("bwd28").collection("users").find(filter).toArray();
}
 
export{
    getuserfiltered, 
    getuserbyId, 
    createusers, 
    deleteuserbyId, 
    updateuserbyId
}