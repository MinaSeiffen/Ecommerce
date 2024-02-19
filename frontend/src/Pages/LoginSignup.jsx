import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state , setState] = useState("Login")
  const [formData , setFormData] = useState({
    username:"",
    email:"",
    password:"",
  })

  const changeHandler = (e) => {
    setFormData({...formData , [e.target.name]: e.target.value})
  }

  const login = async()=>{
    console.log("login" , formData);
    let responseData;
    await fetch('http://localhost:3000/user/login' , {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(res=>res.json()).then((data)=> {responseData = data})
    console.log(responseData);

    if (responseData.success) {
      localStorage.setItem('token' , responseData.token)
      window.location.replace('/')
    }else{
      alert(responseData.MSG)
    }
  }
  
  const signUp = async()=>{
    console.log("signup" , formData);
    let responseData;
    await fetch('http://localhost:3000/user/signup' , {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(res=>res.json()).then((data)=> {responseData = data})

    if (responseData.success) {
      localStorage.setItem('token' , responseData.token)
      window.location.replace('/')
    }else{
      alert("Email is used")
    }
  }

  return (
    <div className='login-signup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up"? <input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='username' /> : <></> }
          <input type="email" name="email" value={FormData.email} onChange={changeHandler} placeholder='Email Address'/>
          <input type="password" name="password" value={FormData.password} onChange={changeHandler} placeholder='Password' />
        </div>
        <button onClick={()=>{state === "Login"? login() : signUp()}}>Contine</button>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p> : <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p> }

        
        
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continue, i agree to the terms of use and privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
