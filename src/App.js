import React from 'react';
import './App.css';
import Header from './component/headerComponent/Header.js';
import Sidebar from './component/sidebarComponent/Sidebar.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './component/chatComponent/Chat.js';
import Login from './component/LoginComponent/Login.js';
import { useStateValue } from './StateProvider.js';

function App() {
  const [{user}] = useStateValue();

  return (
    // BEM naming convention
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <Header />
        <div className='app__body'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<div className="app__welcome">Welcome! Select or create a channel to start chatting.</div>} />
            <Route path="/room/:roomId" element={<Chat/>} />
          </Routes>
        </div>
          </>
        )

        }

      </Router>


    </div>
  );
}

export default App;
