import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Registration from './Registration'

function Login() {
    const [data, setData] =useState({
        username: '', 
        password: ''
    })

    const navigate = useNavigate(); 

    const handlerChange = (e) => {
        const {name, value} = e.target; 

        setData(prev => ({
            ...prev, 
            [name]: value, 
        }))
    }
    const handleLogin = async (e) => {
        e.preventDefault(); 
        console.log(data); 

        try {
            //const res = await fetch('http://localhost:3000/auth/login', {
            const res = await fetch('https://auth-system-vpih.onrender.com/auth/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: data.username, 
                    password: data.password
                })
            })
            const recievedData = await res.json(); 
            localStorage.setItem('token', recievedData.token); 
            navigate('/')
            console.log(recievedData.message); 
        } catch(err) {
            console.log(err); 
        }


        setData({
            username: '',
            password: ''
        })
    }

  return (
    <section>
        <h1> Please enter Cridentials to login </h1>
        <form onSubmit={handleLogin}>

            <input type='text' value={data.username} name='username' placeholder='Please enter your username'  onChange={handlerChange}/> 
            <input type='text' value={data.password} name='password' placeholder='Please enter your password'  onChange={handlerChange}/>
            <button type='submit' > Log in </button> 
        </form>

        <Registration /> 
      
    </section>
  )
}

export default Login; 
