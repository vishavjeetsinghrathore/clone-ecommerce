

const express=require("express")
const router=new express.Router();
const Products=require("../models/productSchema");
const User=require("../models/userSchema");
const bcrypt=require("bcryptjs");
const authenticate=require("../middleware/authenticate");


router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata=await Products.find();
        //console.log("console the data"+productsdata);
        res.status(201).json(productsdata);
    }
    catch(error){
        console.log("error"+error.message);

    }
})

//get individual data
router.get("/getproductsone/:id",async(req,res)=>{

     try{
         const {id}=req.params;
         //console.log(id);
         const individualdata=await Products.findOne({id:id});

         //console.log(individualdata+"individual data");
         res.status(201).json(individualdata);

     }
     catch(error){

        res.status(400).json(individualdata);
        console.log("error"+error.message);
        

     }
});

//register data

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
        console.log("all details not present");
    };

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new User({
                fname, email, mobile, password, cpassword
            });

           

            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error in catching the data" + error.message);
        res.status(422).send(error);
    }

});

//login user api

router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await User.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
           // console.log(isMatch);
 
            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
            } else {
                
                //generate token when password is matching
                const token=await userlogin.generateAuthtoken();
                //console.log(token);

                res.cookie("Amazonweb",token,{
                    expires:new Date(Date.now()+900000),
                    httpOnly:true
                })

                res.status(201).json(userlogin);
            }

        } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
});

//adding the data into cart

router.post("/addcart/:id",authenticate,async(req,res)=>{

        try{
            const {id}=req.params;
            const cart=await Products.findOne({id:id});
            console.log(cart+"cart value");

            const UserContact=await User.findOne({_id:req.userID});
            console.log(UserContact);

            if(UserContact)
            {
                const cartData=await UserContact.addcartdata(cart);

                await UserContact.save();
                console.log(cartData);
                res.status(201).json(UserContact);
            }
            else
            {
                res.status(401).json({
                    error:"invalid user"
                });
            }

        }
        catch(error){

            res.status(401).json({
                error:"invalid user"
            });

        }
});

//get cart details

router.get("/cartdetails",authenticate,async(req,res)=>{

      try{
            const buyuser=await User.findOne({_id:req.userID});
            res.status(201).json(buyuser);
      }
      catch(error){

         console.log("error"+error)

      }
})

//get valid user

router.get("/validuser",authenticate,async(req,res)=>{
     try{
           const validuserone=await User.findOne({_id:req.userID});
           
           res.status(201).json(validuserone);
     }
     catch(error){
        console.log("error"+error);
     }
})

//remove item from cart

router.delete("/remove/:id",authenticate,async(req,res)=>{
     try{
        const {id}=req.params;

        req.rootUser.carts=req.rootUser.carts.filter((cruval)=>{
            return cruval.id!=id;
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item remove");

     }
     catch(error){

        console.log("error"+error);
        res.status(400).json(req.rootUser);

     }
});

//for user logout
//token1,token2,token3,token4
//after logout token1,token2,token3,token4
//undefined cookie

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("eccomerce", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});

module.exports=router;
