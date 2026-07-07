import React, { useState, useRef} from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import  '../../styles/messages.css';

import socket from '../socket'; 


function Messages() {
  const {id} = useParams();
  const [msg, setMsg] = useState(''); 
  const [allmsg, setAllmsg] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null); 


  useEffect(()=> {
    const getMessage = async () => {
      const token = localStorage.getItem('token'); 
      try {

        const res = await fetch(`http://localhost:3000/messages/get/${id}`, {
          method: 'GET', 
          headers: {
            'authorization': `Bearer ${token}`
          }
        })
        if(!res.ok){
          console.log('Can not fetch messages!'); 
          return; 
        }

        const data = await res.json(); 
        setAllmsg(data); 
        console.log(data); 
      } catch (err) {
        console.log(err); 
      }
    }

    getMessage(); 
  },[id])


  useEffect(()=> {
    socket.on('recieve_message', (newMessage) => {
      console.log('RECIeved: ', newMessage); 
      setAllmsg(prev => [...prev, newMessage])
    })

    return () => {
      socket.off('recieve_message'); 
    }
  }, [])

  useEffect(()=> {
    const token = localStorage.getItem('token');  
    if(!token) return; 
    
    const payload = JSON.parse(atob(token.split(".")[1])); 
    setCurrentUser(payload.id); 

    socket.emit("join", payload.id)
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    try {
      const res = await fetch('http://localhost:3000/messages/send', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reciever_id: id, 
          message: msg,
        })
      })
      if(!res.ok){
        console.log('fuck you '); 
        return; 
      }

      const data = await res.json(); 
      socket.emit('send_message', data); 
      setAllmsg(prev => [...prev, data]); 
      console.log(allmsg); 
      console.log(data); 
    } catch (err){
      console.log(err); 
    }

    setMsg('');

  }

  const recieverName = allmsg.length > 0 ? allmsg[0].sender_id === currentUser ? allmsg[0].reciever_username: allmsg[0].sender_username : ''; 
  const messageBottomRef = useRef(); 

  useEffect(()=> {
    messageBottomRef.current?.scrollIntoView({behavior: 'smooth', })
  }, [allmsg]); 
  return (
    <section style={{height: '60vh', overflow: 'hidden'}} className='chat-container'>
      <header className='chat-header'>
        <div className='user-info'>

          <h1> {recieverName}</h1>
          <p> Online </p>  
        </div>
      </header>
      <div className='chat-body' >

        {allmsg.map(resMsg => (
          <div key={resMsg.id} className={`resMsg ${resMsg.sender_id === currentUser ? 'own' : 'other'}`} >
            <div className='bubble'> {resMsg.message}</div>
          </div>
        ))}
        <div ref={messageBottomRef}> </div>
      </div>

      <form onSubmit={handleSubmit} className='chat-footer'> 
        <input type='text' value={msg} onChange={(e) => setMsg(e.target.value)} className=''/>
        <button type='submit' className='w-100'> send </button>
      </form>
    </section>
  ); 
}

export default Messages
