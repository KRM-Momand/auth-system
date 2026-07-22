import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'; 

function Dashboard() {
    const [user, setUser] = useState(null); 


    const navigate = useNavigate(); 
    useEffect(() => {
        const recievedData = async () => {
            const token = localStorage.getItem('token'); 

            try {
                //const res = await fetch('http://localhost:3000/auth/dashboard', {
                const res = await fetch('https://auth-system-vpih.onrender.com/auth/dashboard', {
                    method: 'GET', 
                    headers: {'Authorization': `Bearer ${token}`}
                })
                if(!res.ok){
                    localStorage.removeItem('token')
                    navigate('/login')
                    return; 
                }
                const data = await res.json(); 
                setUser(data?.user); 

            }catch (err){
              console.log(err); 
            }
        }

        recievedData(); 

    }, []); 




    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login')
    }
  return (
    <section className='container'>
        <nav>

            <div>
                {user ? (
                    <div>
                        <h1> {user} </h1>
                        <button type='button' onClick={handleLogout}> Logout </button>
                    </div>
                ) : (
                    <div>

                    <Link to='login'>Login</Link> 
                    <Link to='register'>Create a free account </Link>
                    </div>
                )}
            </div>
        </nav>

      
    </section>
  )
}

export default Dashboard
