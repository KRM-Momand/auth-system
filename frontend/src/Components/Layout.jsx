import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'; 
import { Link } from 'react-router-dom';

function Layout() {
  const [user, setUser] = useState(null); 

  useEffect(()=> {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if(!token){
        setUser(null); 
        return; 
      } 
      try {

        const res = await fetch('http://localhost:3000/auth/dashboard', {
          method: 'GET', 
          headers: {'Authorization' : `Bearer ${token}`}
        })

        if(!res.ok){
          setUser(null)
          return; 
        }
  
        const data =await res.json(); 
        setUser(data?.user); 
      } catch (err){
        console.log(err); 
        setUser(null); 
      }


    }

    fetchUser(); 
  }, [])
  return (
    <section style={{height: '100vh'}}>

      <div className='container-fluid bg-secondary text-white d-flex justify-content-between align-items-center py-2 px-3'>

        <h3 className=''>Whatsapp</h3>
        <h3> {user} </h3>
      </div>
      <div style={{height: '80vh'}}>

        <Outlet /> 
      </div>
      <nav className='navbar bg-secondary px-3'>
        <ul className='navbar-nav'>
            <li className='nav-item'>
        <Link className='nav-link text-white' to='/'>HOME</Link>
            </li>
        </ul>
        <ul className='navbar-nav'>
            <li className='nav-item'>
        <Link className='nav-link text-white' to='/events'>Events</Link>
            </li>
        </ul>
        <ul className='navbar-nav'>
            <li className='nav-item'>
        <Link className='nav-link text-white' to='/friends'>Friends</Link>
            </li>
        </ul>
        <ul className='navbar-nav'>
            <li className='nav-item'>
        <Link className='nav-link text-white' to='/nearby'>Nearby</Link>
            </li>
        </ul>
      </nav>
    </section>
  )
}

export default Layout; 
