import './App.css'
import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login';
import { useState } from 'react';
import Privateroute from './components/Privateroute';
import Mytodos from './components/Mytodos';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  return (
    <>
    <ToastContainer position="top-right" autoClose={1000} />
      <BrowserRouter>
            <Routes>

              <Route path='/' element={<Navigate to='/login'/>}/>

              <Route path='/login'    element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
              <Route path='/register' element={<Registration/>} />

              <Route
                path='/mytodo'
                element={
                <Privateroute isAuthenticated={isAuthenticated}> 
                  <Mytodos/>
                </Privateroute>
                }
              />

              <Route path='*' element={<h1>404 Page Not Found!</h1>}/>

            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
