import React from 'react'
import Registration from './Components/Registration'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout'; 
import Friends from './Components/Friends'; 
import Events from './Components/Events'; 
import Nearby from './Components/Nearby';
import FriendsOutlet from './Components/FriendsOutlet';
import Messages from './Components/Messages'; 
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <section className='' style={{width: '400px'}}>
      <Routes>
          <Route path='login' element={<Login /> } />
          <Route path='registration' element={<Registration /> } />

        <Route path='/' element={ <ProtectedRoute> <Layout /> </ProtectedRoute>}>

          <Route index element={<Dashboard /> } />
          <Route path='friends' element={<FriendsOutlet /> }>
            <Route index element={<Friends />} />
            <Route path='messages/:id' element={<Messages />} /> 
          </Route>
          <Route path='events' element={<Events /> } />
          <Route path='nearby' element={<Nearby /> } />
        </Route>
      </Routes>

    </section>
  )
}

export default App
