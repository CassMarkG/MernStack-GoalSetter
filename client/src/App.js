import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/Register.jsx';


function App(){
    return(
        <>
        <Router>
            <div className='container'>
                <Header />
                <Routes>
                    <Route path ='/' element ={<Dashboard />} />
                    <Route path ='/register' element ={<Register />} />
                    <Route path ='/login' element ={<Login />} />
                </Routes>
            </div>
        </Router>
        <ToastContainer />
        </>
    );
}

export default App;