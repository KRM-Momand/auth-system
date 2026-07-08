import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Friends() {
  const [friends, setFriends ] = useState([]); 

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const getFriend = async () => {
      try {
        //const fetchFriends = await fetch('http://localhost:3000/friends/friendsList', {
        const fetchFriends = await fetch('https://auth-system-vpih.onrender.com/friends/friendsList', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })

        const fetchedFriends = await fetchFriends.json(); 
        setFriends(fetchedFriends);
      } catch (err) {
        console.log(err); 
      }
    }

    getFriend(); 
  }, [])

  const handleSendMsg = async () => {

    try {
      //const res =await fetch('http://localhost:3000/messages/send', {
      const res =await fetch('https://auth-system-vpih.onrender.com/messages/send', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: {
          // here i need to add what to send
        }
      })

      const data = await res.json();
    } catch (err){
      console.log(err); 
    }
  }
  return (
    <section className='d-flex justify-content-center align-items-center flex-column w-100'>
        <h1 className='text-secondary my-2'>Friend List</h1>
        <div className='w-100 d-flex flex-column'>
          {friends?.map(friend => (
            <div key={friend.id} className='w-100 bg-secondary p-2 my-1'>
                <Link to={`messages/${friend.id}`} className='text-white'>{friend.username}</Link>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Friends
