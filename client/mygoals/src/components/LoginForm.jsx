import { React,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login,reset } from "../features/auth/authSlice.js";
import {toast} from "react-toastify"
import Spinner from "../components/Spinner";
 import '../login.css';

function LoginForm(){
    // const onSignup = () => {
    //     dispatch(logout())
    //     dispatch((reset()))
    //     navigate('/register')
    // }

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const {email,password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isLoading,isError,isSuccess,message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/dashboard')
        }
        dispatch(reset())
    }, [user,isError,isSuccess,message,navigate,dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    const onHit = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if(isLoading){
        return <Spinner />
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="login-form">
            <div class="textbox">
                <input 
                type="email" 
                placeholder="Username"
                name="email"
                value={email}
                onChange={onHit}
                />
                <span class="material-symbols-outlined">account_circle</span>
            </div>
            <div class="textbox">
                <input 
                type="password" 
                placeholder="Password"
                name="password"
                value={password}
                onChange={onHit}
                />
                <span class="material-symbols-outlined">lock</span>
            </div>
            
            <button type="submit">Login</button>
            
        </form>
        </>
    );
}

export default LoginForm;