import React from 'react'
import './signup.css'
import { Divider } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const senddata=async(e)=>{

         e.preventDefault();
         const {fname,email,mobile,password,cpassword}=udata;

         const res=await fetch("register",{
             method:"POST",
             headers:{
                "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 fname,email,mobile,password,cpassword
             })
         });

         const data=await res.json();

        // console.log(data);

        if(res.status===422 || !data)
        {
            toast.warning("invalid details",{
                position:"top-center",
            })
        }
        else
        {
            toast.success("data successfully added",{
                position:"top-center",
            })

            setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""});
        }


    }


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
