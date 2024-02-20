import React, { useContext } from 'react'
import axios from 'axios';
import './signup.css'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const Sign_in = () => {

    

    const [logdata,setData]=useState({
        email:"",
        password:""
    });

    console.log(logdata);

    const {account,setAccount}=useContext(LoginContext);

    const adddata=(e)=>{
        const {name,value}=e.target;

        setData(()=>{
            return{
                ...logdata,
                [name]:value
            }
        })
    }

    // const senddata=async(e)=>{
    //     e.preventDefault();

    //     const {email,password}=logdata;

    //     const res=await fetch(`${BASE_URL}/login`,{
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json"

    //         },
    //         body:JSON.stringify({
    //             email,password
    //         })
    //     });

    //     const data=await res.json();

    //     console.log(data);

    //     if(res.status==400 || !data)
    //     {
    //         console.log("invalid details");
    //         toast.warn("invalid details",{
    //             position:"top-center",
    //         })
    //     }
    //     else
    //     {
    //         setAccount(data);
    //         setData({...logdata,email:"",password:""});
    //         toast.success("user valid",{
    //             position:"top-center",
    //         })
    //         setData({...logdata,email:"",password:""});
    //     }

    // }
    const senddata = async (e) => {
        e.preventDefault();
    
        const { email, password } = logdata;
    
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const data = response.data;
    
            if (response.status === 201 && data) { // Assuming the token is sent back on a successful login
                // Store the token in localStorage or another secure place
                console.log(data.token.toString())
                localStorage.setItem('jwtToken', data.token.toString());
                setAccount(data.user); // Assuming you want to store the user details
                setData({...logdata,email:"",password:""});// Reset the login form fields
                toast.success("Login successful", {
                    position: "top-center",
                });
                // Redirect or further action here after successful login
            } else {
                console.log("invalid details");
                toast.warn("Invalid details", {
                    position: "top-center",
                });
            }
    
        } catch (error) {
            if (error.response) {
                // Server responded with a status code that falls out of the range of 2xx
                console.error("An error occurred:", error.response.data);
                toast.warn(error.response.data.error || "Invalid details or server error", {
                    position: "top-center",
                });
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                toast.error("No response from server", {
                    position: "top-center",
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error:", error.message);
                toast.error("Error sending request", {
                    position: "top-center",
                });
            }
        }
        
    };
    

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                               onChange={adddata}
                               value={logdata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                               onChange={adddata}
                               value={logdata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                    </form>
                    
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <NavLink to='/register'><button className='signin_btn'>Create Your amazon account</button></NavLink>
                    
                </div>
            </div>
            <ToastContainer/>

        </section>
    )
}

export default Sign_in