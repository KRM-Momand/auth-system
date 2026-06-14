import React, { useState } from 'react'

function Registration() {

    const [data, setData] = useState({
        username: '', 
        password: '', 
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
            const res = await fetch("http://localhost:3000/auth/register",  {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username, 
                    password: data.password
                })
            }); 
            const resData =await res.json(); 
            console.log(resData); 

        } catch(err) {
            console.log(err); 
        }

        setData(prev => ({
            username: '', 
            password: '', 
        }))
    }

  return (
    <section>
        <h1> Registration Form </h1>
        <form onSubmit={submitHandler}>

            <input type='text' placeholder='Please enter your name' name='username' value={data.username} onChange={dataHandler} /> 
            <input type='text' placeholder='Please enter your password' name='password' value={data.password} onChange={dataHandler} /> 

            <button type='submit'> Submit </button>
        </form>
    </section>
  )
}

export default Registration
