
require("dotenv").config();

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const stripe=require("stripe")(process.env.STRIPE_SECRET)
require("./db/conn");
const cookieParser=require("cookie-parser");

const Products=require("./models/productSchema");
const DefaultData=require("./defaultdata");

const cors=require("cors");
const router=require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(router);

//create checkout api

app.post("/api/create-checkout-session",async(req,res)=>{
     const {products,currency,customerEmail,shippingDetails}=req.body; // Assume these additional details are passed

     // Your existing product validation logic...
     const lineItems=products.map((product)=>{
        if(!product.qnt || product.qnt<1 || !product.price.cost || !product.title.shortTitle){
             // Throw an error if quantity is less than 1 or other required fields are missing
             throw new Error(`Invalid product: Each product must have a quantity (qnt) greater than or equal to 1, a price (price.cost), and a title (title.shortTitle). Found product: ${JSON.stringify(product)}`);
        }

        return{
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.title.shortTitle,
                },
                unit_amount:product.price.cost*100, // Assuming this is the correct conversion to your currency's smallest unit

            },
            quantity:product.qnt,
        };

     });

     try{
  
          const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel",
            currency,// Dynamically set based on customer's location or transaction type
            customer_email:customerEmail,// Optional: Collect customer email
            shipping_address_collection:{
                allowed_countries:['US','GB','CA'], // Example: Adjust based on your target market outside India

            },
            // Optionally, specify billing address details if available and relevant
          });

          res.json({id:session.id});
     }
     catch(error){
        console.error('Error creating Stripe checkout session:',error);
        res.status(500).json({error:'Internal Server Error'});
     }

});
        


const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


app.listen(PORT,()=>{

     console.log(`server is running on port number ${PORT}`);
});

DefaultData();