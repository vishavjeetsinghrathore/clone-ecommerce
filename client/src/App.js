import logo from './logo.svg';
import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincom from './components/home/Maincom';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_sign/Sign_in';
import SIgnUp from './components/signup_sign/SIgnUp';
import Buynow from './components/buynow/Buynow';
import { Routes, Route } from 'react-router-dom'
import Cart from './components/cart/Cart';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react'
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {

  const [data, setData] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setData(true)
    }, 2000)

  }, []);

  return (
    <>
      {
        data ? (

          <>
            <Navbar />
            <Newnav />
            
            <Routes>
              <Route path='/' element={<Maincom />} />
              <Route path='/login' element={<Sign_in />} />
              <Route path='/register' element={<SIgnUp />} />
              <Route path='/getproductsone/:id' element={<Cart />} />
              <Route path='/buynow' element={<Buynow />} />
             
              <Route path='/success' element={<Success/>}/>
              <Route path='/cancel' element={<Cancel/>}/>
            </Routes>

           
          </>
        ) : (
          <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )
      }

    </>
  );
}

export default App;
