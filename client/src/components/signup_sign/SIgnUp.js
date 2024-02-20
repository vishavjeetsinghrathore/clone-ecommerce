import React from 'react'
import axios from 'axios';
import './signup.css'
import { Divider } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const SIgnUp = () => {

    const [udata,setUdata]=useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    });

    console.log(udata);

    const adddata=(e)=>{
        const {name,value}=e.target;

        setUdata(()=>{
            return{
                 ...udata,
                 [name]:value
            }
        })
    }

    // const senddata=async(e)=>{

    //      e.preventDefault();
    //      const {fname,email,mobile,password,cpassword}=udata;

    //      const res=await fetch(`${BASE_URL}/register`,{
    //          method:"POST",
    //          headers:{
    //             "Content-Type":"application/json"
    //          },
    //          body:JSON.stringify({
    //              fname,email,mobile,password,cpassword
    //          })
    //      });

    //      const data=await res.json();

    //     // console.log(data);

    //     if(res.status===422 || !data)
    //     {
    //         toast.warning("invalid details",{
    //             position:"top-center",
    //         })
    //     }
    //     else
    //     {
    //         toast.success("data successfully added",{
    //             position:"top-center",
    //         })

    //         setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""});
    //     }


    // }
    const senddata = async (e) => {
        e.preventDefault();
    
        const { fname, email, mobile, password, cpassword } = udata;
        

        try {
            const response = await axios.post(`${BASE_URL}/register`, {
                fname, email, mobile, password, cpassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                   
                }
            });
    
            // Assuming the API response structure
            // console.log(response.data);
    
            toast.success("data successfully added", {
                position: "top-center",
            });
    
            // Resetting the form fields after successful registration
            setUdata({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
    
        } catch (error) {
            // Assuming error.response exists and it has a status to check
            if (error.response && (error.response.status === 422 || !error.response.data)) {
                toast.warning("invalid details", {
                    position: "top-center",
                });
            } else {
                // Handling other kinds of errors (network issues, server down, etc.)
                console.error("An error occurred:", error.message);
                toast.error("An unexpected error occurred", {
                    position: "top-center",
                });
            }
        }
    };

  return (
    <section>
        <div className='sign_container'>
            <div className='sign_header'>
            <img src='./blacklogoamazon.png' alt='signupimg'/>
            </div>
            <div className='sign_form'>
                <form method='POST'>
                    <h1>Sign-Up</h1>
                    <div className='form_data'>
                        <label htmlFor='name'>Your name</label>
                        <input type='text' name='fname' id='name'
                        onChange={adddata}
                        value={udata.fname}
                        />
                    </div>
                    <div className='form_data'>
                        <label htmlFor='email'>email</label>
                        <input type='email' name='email' id='email'
                        onChange={adddata}
                        value={udata.email}
                        />
                    </div>
                    <div className='form_data'>
                        <label htmlFor='mobile'>Mobile number</label>
                        <input type='number' name='mobile' id='mobile'
                        onChange={adddata}
                        value={udata.mobile}
                        />
                    </div>
                    <div className='form_data'>
                        <label htmlfor='password'>Password</label>
                        <input type='password' id='password' placeholder='At least 6 char' name='password'
                        onChange={adddata}
                        value={udata.password}
                        />
                    </div>
                    <div className='form_data'>
                        <label className='passwordg'>
                            Password again
                        </label>
                        <input type='password' name='cpassword' id='passwordg'
                         onChange={adddata}
                         value={udata.cpassword}
                        />

                    </div>
                    <button className='signin_btn' onClick={senddata}>
                        Continue
                    </button>
                    <Divider/>
                    <div className='signin_info'>
                        <p>Already have an account?</p>
                        <NavLink to='/login'>Signin</NavLink>

                    </div>
                </form>
            </div>
           
             <ToastContainer/>
        </div>
    </section>
  )
}

export default SIgnUp
