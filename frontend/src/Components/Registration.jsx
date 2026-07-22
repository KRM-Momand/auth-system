import React, { useState } from 'react'
import '../../styles/register.css'; 
import { Link, redirect } from 'react-router-dom';

function Registration() {

    const [data, setData] = useState({
        name: '', 
        username: '', 
        password: '', 
        email: '', 
    }); 

    const dataHandler = (e) => {
        const {name, value} = e.target; 
       setData(prev => {
        return {...prev, [name]: value, }
       })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            //const res = await fetch("http://localhost:3000/auth/register",  {
            const res = await fetch("https://auth-system-vpih.onrender.com/auth/register",  {
            method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username, 
                    password: data.password,
                    name: data.name, 
                    email: data.email
                })
            }); 

            const resData =await res.json();
            if( !res.ok ){
                alert(resData.message);
            } else {
                alert(resData.message); 
            }

        } catch(err) {
            alert(err); 
        }

        setData(prev => ({
            username: '', 
            password: '', 
            name: '', 
            email: ''
        }))
    }

  return (
    <section className='register-page'>
        <div className='register-card'>

            <h1> Create Account </h1>
            <form onSubmit={submitHandler} className='register-form'>

                <input type='text' placeholder='Please enter your name' name='name' value={data.name} onChange={dataHandler} /> 
                <input type='text' placeholder='Please choose a username' name='username' value={data.username} onChange={dataHandler} /> 
                <input type='password' placeholder='Please enter your password' name='password' value={data.password} onChange={dataHandler} /> 
                <input type='email' placeholder='Please enter your email' name='email' value={data.email} onChange={dataHandler} /> 

                <button type='submit'> Create an Account </button>
            </form>
        <div className='my-5 register-switch'>
            <p> Already have an Account</p>
            <Link to='/login' className='switch-btn' >Login</Link>
        </div>
        </div>
    </section>
  )
}

export default Registration
