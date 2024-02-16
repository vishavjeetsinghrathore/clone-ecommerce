

import React from 'react'
import Avatar from '@mui/material/Avatar'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import { Divider } from '@mui/material';
import "./rightheader.css"
import LogoutIcon from '@mui/icons-material/Logout';


const Rightheader = ({ logclose, Logoutuser }) => {

    const { account, setAccount } = useContext(LoginContext);

    const imgd="/flag.png"
    return (
        <>
            <div className='rightheader'>
                <div className='right_nav'>
                    {
                        account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar'></Avatar>
                    }
                    {account ? <h3>Hello, {account.fname.toUpperCase()} </h3> : ""}
                </div>
                <div className='nav_btn' onClick={() => logclose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop By category</NavLink>

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    <NavLink to="/">today's Deal</NavLink>
                    {
                        account ? <NavLink to="/buynow">Your Order</NavLink> :
                            <NavLink to="/login">Your Order</NavLink>
                    }

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <div className="flag">
                        <NavLink to="/">Settings</NavLink>
                        <img src={imgd} style={{ width: 35, marginLeft: 10 }} alt="" />

                    </div>
                    {
                        account ?

                            <div className="flag">

                                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                                <h3 onClick={() => Logoutuser()} style={{ cursor: "pointer", fontWeight: 500 }}>Logout</h3>
                            </div> :
                            <NavLink to="/login">SignIn</NavLink>
                    }


                </div>

            </div>
        </>

    )
}

export default Rightheader