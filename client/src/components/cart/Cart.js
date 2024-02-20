import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import "./cart.css";
import { LoginContext } from '../context/ContextProvider';
import { CircularProgress, Divider } from '@mui/material';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Footer from '../footer/Footer';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const Cart = () => {


    const { id } = useParams("");

   // console.log(id);

   const history=useNavigate("");
   

    const {account,setAccount}=useContext(LoginContext)

    const [inddata, setInddata] = useState("");

  //console.log([inddata]);

    // const getinddata = async () => {
    //     const res = await fetch(`${BASE_URL}/getproductsone/${id}`, {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include"
    //     });

    //     const data = await res.json();
    //     //console.log(data);

    //     if (res.status !== 201) {
    //         alert("no data available")
    //     } else {
    //         // console.log("ind mila hain");
    //         setInddata(data);
    //     }
    // };

    // useEffect(()=>{
    //    getinddata();
    // },[id]);
    const getinddata = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getproductsone/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
    
            if (response.status !== 201) {
                alert("no data available");
            } else {
                setInddata(response.data);
            }
        } catch (error) {
            console.error("An error occurred:", error.response);
        }
    };
    
    useEffect(() => {
        getinddata();
    }, [id]);

     //add to cart
    //  const addtocart=async(id)=>{
         
    //       const checkres=await fetch(`${BASE_URL}/addcart/${id}`,{
    //          method:"POST",
    //          headers:{
    //             Accept:"application/json",
    //             "Content-Type":"application/json"
    //          },
    //          body:JSON.stringify({
    //             inddata
    //          }),
    //          credentials:"include"
    //       });

    //       const data1=await checkres.json();
    //       console.log(data1);

    //       if(checkres.status==401 ||!data1)
    //       {
    //         console.log("user invalid");
    //         alert("user invalid");
    //       }
    //       else
    //       {
    //         //alert("data added in your cart")
    //         history("/buynow");
    //         setAccount(data1)
    //       }

    //  }
    const addtocart = async (id) => {
        try {
            const tokenWithQuotes = localStorage.getItem("jwtToken"); // This retrieves the token, assuming it's stored with quotes.
            const token = tokenWithQuotes.replace(/^"|"$/g, ''); // This removes quotes at the start and end of the string.
            console.log(token);
            console.log(token)

            const response = await axios.post(`${BASE_URL}/addcart/${id}`, {
                inddata,
                token:token
            }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                
                withCredentials: true
            });
    
            console.log(response.data);
    
            if (response.status == 401 || !response.data) {
                console.log("user invalid");
                alert("user invalid");
            } else {
                // If you're using React Router, make sure `history` is correctly instantiated
                // For example, if using React Router v6, use `useNavigate` instead of `history`
                history("/buynow"); // Ensure `history` is defined, might need to adjust based on your React Router version
                setAccount(response.data);
            }
    
        } catch (error) {
            console.error("An error occurred:", error.response);
        }
    };

    return (

        <div className="cart_section">
            {inddata && Object.keys(inddata).length &&
                <div className="cart_container">
                    <div className="left_cart">
                
                   <img  src={inddata.detailUrl} alt="cart"/>
                   
                    <div className='cart_btn'>
                        <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
                        <button className='cart_btn2'>Buy Now</button>

                    </div>

                    </div>
                    <div className="right_cart">
                        <h3>{inddata.title.shortTitle}</h3>
                        <h4>{inddata.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{inddata.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount}) </span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
                </div>
            }
            {
                !inddata ?
                    <div className='circle'>
                        <CircularProgress/>
                        <h2>Loading...</h2>
                    </div> : ""
            }
            <Footer />
        </div>
    )
}

export default Cart