

const jwt=require("jsonwebtoken");
const User=require("../models/userSchema");

const secretKey=process.env.KEY;

// const authenticate=async(req,res,next)=>{
     
//      try{
//         const token=req.cookies.Amazonweb;
//         const verifyToken=jwt.verify(token,secretKey);

//         console.log(verifyToken);

//         const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
//         console.log(rootUser);

//         if(!rootUser)
//         {
//             throw new Error("user not found")
//         };

//         req.token=token
//         req.rootUser=rootUser
//         req.userID=rootUser._id

//         next();

//      }
//      catch(error){

//         res.status(401).send("unauthorized: No token provide")
//         console.log(error)

//      }
// }
const authenticate = async (req, res, next) => {
   try {
       let token = req?.query?.token||req?.body?.token;
       console.log(req,'hh')

       if (!token) {

           throw new Error("No token provided");
       }

       const verifyToken = jwt.verify(token, secretKey);
    
       const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

       if (!rootUser) {
           throw new Error("User not found");
       }

       req.token = token;
       req.rootUser = rootUser;
       req.userID = rootUser._id;

       next();
   } catch (error) {
       res.status(401).send("Unauthorized: No token provided");
       console.log(error);
   }
};


module.exports=authenticate;