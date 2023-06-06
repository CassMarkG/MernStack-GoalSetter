import { React,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register,reset } from "../features/auth/authSlice.js";
import {toast} from "react-toastify"
import Spinner from "../components/Spinner.jsx"
import '../register.css';


function RegisterForm(){
     //capture input
  //formData is initialstate and setFormData is obj used to update state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const {name,email,password} = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,isLoading,isError,isSuccess,message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError,isSuccess,message,navigate,dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,email,password
    }
    dispatch(register(userData))
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
    <form onSubmit={handleSubmit} className="register-form"> 
     <div class="textbox1">
                <div class="textbox">
                    <input 
                    type="text" 
                    placeholder="Name" 
                    name="name"
                    value={name}
                    onChange={onHit}
                    required/>
                    <span class="material-symbols-outlined">account_circle</span>
                </div>
                

            </div>
      <div className="textbox">
        <input 
        type="email"
        placeholder="Email" 
        required 
        name="email"
        value={email}
        onChange={onHit} 
        />
        <span className="material-symbols-outlined">mail</span>
      </div>
      <div className="textbox">
        <input
           type="password"
          placeholder="Password"
          id="passw"
          //type="password"
          name="password"
          value={password}
          onChange={onHit}
          required
        />
        <span className="material-symbols-outlined">lock</span>
      </div>
      
      <button type="submit" >Register</button>
      <div>
        
      </div>
    </form>
  );
}

export default RegisterForm;
