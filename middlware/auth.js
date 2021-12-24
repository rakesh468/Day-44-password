import jwt from "jsonwebtoken"
// custom middleware to check token is valid //
 export const auth=(request,response,next)=>{
     try{
        const token=request.header("x-ath-token")
        console.log("token",token)
        jwt.verify(token,process.env.SECRET_KEY)
        next();
     }
   catch(err){
       response.statuus(401).send({error:err.message})
   }
}
