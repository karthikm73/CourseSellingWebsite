import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../config,js";

import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";


function Landing(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

 return (<>

    <h3>Username</h3>
    <input type="text" onChange={(e)=>{setUsername(e.target.value)}}></input>



    <h3>Password</h3>
    <input type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>

    <div className="buttons-login">
        <Signup username={username} password={password}></Signup>
        <Loginin username={username} password={password}></Loginin>
            
            
    </div>



 </>
 )
}

function Signup({username,password}){
     const navigate = useNavigate();
     const setUser = useSetRecoilState(userState);
   async function signup(){
       
    try{
    const response = await axios.post(`${BASE_URL}/admin/signup`,{
            username:username,
            password:password
        })
        let data = response.data;
        // alert(data.message);
        localStorage.setItem('token',data.token);
        

        setUser({ isLoading: false,adminEmail: username})
        // localStorage.setItem('userState', JSON.stringify(userState));
        navigate('/courses');

    }
    catch(error){

        if (error.response.status === 403) {
            alert(error.response.data.message);

          }     }
}

    return(
        <>
        <button className="buttons" onClick={()=>signup()}>Signup</button>
        </>
    )
    
}

function Loginin({username,password}){
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    async function login(){
        
     try{
     const response = await axios.post(`${BASE_URL}/admin/login`,{
             username:username,
             password:password
         })
         let data = response.data;
        //  alert(data.message);
        localStorage.setItem('token',data.token);
        navigate('/courses');

         
     }
     catch(error){
 
         if (error.response.status === 403) {
             
             alert(error.response.data.message);
           }     }
 }
 
     return(
         <>
         <button className="buttons" onClick={()=>login()}>Login</button>
         </>
     )
     
 }
export default Landing;