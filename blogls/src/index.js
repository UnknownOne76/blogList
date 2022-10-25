import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FsContextPrv from './context/fsCont';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import SpecPost from './comps/spec';
import SignUp from './comps/signUp';
import SignIn from './comps/signIn';
import Post from './comps/post';
const loggedIn = window.localStorage.getItem("isLoggedIn");
const localStrg = window.localStorage;  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <FsContextPrv>
    <Routes>
    <Route exact path='/' element={localStrg.getItem("isLoggedIn") === null ? <SignUp /> : <App />}/>
    <Route path='/login' element={localStrg.getItem("isLoggedIn") === null ? <SignIn /> : <App />}/>
    <Route path='/post' element={loggedIn ? <Post/> : <SignUp />}/>
    <Route path='/main' element={loggedIn ? <App /> : <SignUp />}/>
    <Route path='spec/:id' element={loggedIn ? <SpecPost /> : <SignUp />}/>
    <Route path='*' element={<div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center text-4xl text-green-500'> Nothing to see here. </div>}/>
    </Routes>
    </FsContextPrv>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
