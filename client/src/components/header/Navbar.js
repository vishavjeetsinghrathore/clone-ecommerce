import React, { useContext } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import "../header/navbar.css";
import Rightheader from './Rightheader';
import { useEffect } from 'react'
import { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);
    //console.log(account);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (() => {
        setAnchorEl(null);
    });

    const [text, setText] = useState("");
    console.log(text);

    const [liopen, setLiopen] = useState(true);

    const { products } = useSelector(state => state.getproductsdata);


    const [dropen, setDropen] = useState(false);

    // const getdetailvaliduser = async () => {
    //     const res = await fetch(`${BASE_URL}/validuser`, {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include"
    //     });

    //     const data = await res.json();
    //     console.log(data);

    //     if (res.status !== 201) {
    //         console.log("error");
    //     }
    //     else {
    //         console.log("data valid");
    //         setAccount(data);
    //     }

    // }
    // const getdetailvaliduser = async () => {
    //     try {
    //         const token = localStorage.getItem('jwtToken');
    //     if (!token) {
    //         console.log("No token found, authorization required.");
    //         return; // Exit the function if no token is found
    //     }
    //         const response = await axios.get(`${BASE_URL}/validuser`, {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true
    //         });
    
    //         console.log(response.data);
    
    //         if (response.status !== 201) {
    //             console.log("error");
    //         } else {
    //             console.log("data valid");
    //             setAccount(response.data);
    //         }
    
    //     } catch (error) {
    //         console.error("An error occurred:", error.response);
    //     }
    // };
    const getdetailvaliduser = async () => {
        try {
            // const token = localStorage.getItem('jwtToken');
            // if (!token) {
            //     console.log("No token found, authorization required.");
            //     return; // Exit the function if no token is found
            // }
            const tokenWithQuotes = localStorage.getItem("jwtToken"); // This retrieves the token, assuming it's stored with quotes.
            const token = tokenWithQuotes.replace(/^"|"$/g, '');
            const response = await axios.get(`${BASE_URL}/validuser`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                params:{
                    token:token
                }
                //withCredentials: true
            });
    
            console.log(response.data);
    
            if (response.status !== 201) {
                console.log("error");
            } else {
                console.log("data valid");
                setAccount(response.data);
            }
        } catch (error) {
            console.error("An error occurred:", error.response);
        }
    };
    

    const handleopen = () => {
        setDropen(true);
    }

    const handledrclose = () => {
        setDropen(false);
    }

    // const logoutuser = async () => {
    //     const res2 = await fetch(`${BASE_URL}/logout`, {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include"
    //     });

    //     const data2 = await res2.json();
    //     console.log(data2);

    //     if (res2.status !== 201) {
    //         console.log("error")
    //     }
    //     else {
    //         console.log("data valid")
    //         //alert("logout")
    //         toast.success("user logout successfully", {
    //             position: "top-center",
    //         })
    //         navigate("/");
    //         setAccount(false);

    //     }
    // };
    const logoutuser = async () => {
        try {
            const tokenWithQuotes = localStorage.getItem("jwtToken"); // This retrieves the token, assuming it's stored with quotes.
            const token = tokenWithQuotes.replace(/^"|"$/g, '');
            const response = await axios.get(`${BASE_URL}/logout`, {
                headers: {
                    
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                params:{
                    token:token
                }
                //withCredentials: true
            });
    
            console.log(response.data);
    
            if (response.status !== 201) {
                console.log("error");
            } else {
                console.log("data valid");
                localStorage.removeItem('jwtToken');
                toast.success("user logout successfully", {
                    position: "top-center",
                });
                navigate("/"); // Ensure `navigate` is correctly instantiated, might need to use `useNavigate` hook from React Router v6
                setAccount(false);
            }
    
        } catch (error) {
            console.error("An error occurred:", error.response);
        }
    };

    const getText = (item) => {
        setText(item);
        setLiopen(false);
    }

    const handleLogout = () => {
        handleClose(); // Close the menu
        logoutuser(); // Logout the user
      };

    useEffect(() => {
        getdetailvaliduser();
    }, []);

    // Ensure account and account.carts are defined before trying to access account.carts.length
    const cartLength = account && account.carts ? account.carts.length : 0;

    return (
        <header>
            <nav>
                <div className='left'>
                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handledrclose}>
                        <Rightheader logclose={handledrclose} Logoutuser={logoutuser}/>
                    </Drawer>
                    <div className='navlogo'>
                        <NavLink to='/'> <img src="./amazon_PNG25.png" alt="" /></NavLink>
                    </div>
                    <div className='nav_searchbaar'>
                        <input type='text' name=''
                            placeholder='Search your products'
                            onChange={(e) => getText(e.target.value)}
                            id='' />
                        <div className='search_icon'>
                            <SearchIcon id='search' />
                        </div>
                        {/*search filter*/}
                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>{product.title.longTitle}</NavLink>

                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink to='/login'>signin</NavLink>
                    </div>
                    <div className='cart_btn'>
                        {
                            account ? <NavLink to='/buynow'>
                                <Badge badgeContent={cartLength} color='primary'>
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink> : <NavLink to='/login'>
                                <Badge badgeContent={0} color='primary'>
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink>
                        }

                        <ToastContainer />
                        <p>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar2'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}

                        >{account.fname[0].toUpperCase()}</Avatar>
                            : <Avatar className='avtar'
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            ></Avatar>
                    }


                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account ? <MenuItem onClick={handleLogout}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
                        }

                    </Menu>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
