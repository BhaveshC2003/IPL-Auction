import React,{useState} from "react";
import "../styles/Login.css";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginID, setloginID] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  
  const submit = async() =>{
    //window.location.href = "/dashboard"
    const userDetails = {
      name:loginID,
      password:password
    }
    const {data} = await axios.post("http://localhost:9000/login",userDetails,{headers:{"Content-Type":"application/json"}})
    if(data.user){
      alert(data.message)
      localStorage.clear()
      localStorage.setItem("name",data.user.name)
      navigate("/dashboard")
    }else{
      alert(data.message)
    }
  }
  return (
    <div className="LandingPage">
      <div className="image-container">
        <img className='image' src="../media/logo.png" alt="" />
      </div>
      <div>
        <span className="Name">
          {" "}
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("IPL AUCTION 2023").pauseFor(1000).deleteAll().typeString("WELCOMES YOU").start().pauseFor(500).deleteAll();
            }} options={{loop:true}}
          />
        </span>
      </div>
      <div className="LoginContainer">
      
        <input type="text" value={loginID} onChange={(e)=>{ setloginID(e.target.value) }} className="input" placeholder="Login ID" />
        <input type="password" value={password} onChange={(e)=>{ setPassword(e.target.value) }}  className="input" placeholder="Password" />
          <button onClick={submit}>Submit</button>
        
      </div>
    </div>
  );
}
