import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Right = ({item}) => {

  //console.log(item);
  const [price,setPrice]=useState(0);

  useEffect(()=>{
     totalAmount();
  },[item]);

  const totalAmount=()=>{
     let price=0;
     item.map((item1)=>{
       price=item1.price.cost+price

     });
     setPrice(price);
  }
   
  
  //payment integration
  const makePayment=async()=>{
    
     const stripe=await loadStripe("pk_test_51OiICWSDeb0dWWpkaK0edH2lUcS3McWle4IVKhMYu83P1g7hzuKUxLYtzgaIJlkAwNNny5Gii1s4An38rbhL2xLM00zKv2Ktux");
     const body={
      products:item
     }
     const headers={
      "Content-Type":"application/json"
     }
     const response=await fetch(`${BASE_URL}/api/create-checkout-session`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
     });

     const session=await response.json();
     const result=stripe.redirectToCheckout({
      sessionId:session.id
     })
     if(result.error)
     {
      console.log(result.error);
     }
  }

  return (
    <div className='right_buy'>
      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg"/>
      <div className='cost_right'>
        <p>Your order is eligible for Free Delivery</p><br/>
        <span style={{color:"#565959"}}>Select this option at checkout. Details</span>
        <h3>Subtotal ({item.length} items): <span style={{fontWeight:700}}>₹{price}.00</span></h3>
        <button className='rightbuy_btn'
        onClick={()=>makePayment()}
        >
            Process to Buy
        </button>
        <div className='emi'>
            Emi available
        </div>
      </div>
    </div>
  )
}

export default Right
