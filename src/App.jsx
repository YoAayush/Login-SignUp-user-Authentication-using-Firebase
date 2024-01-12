import React, { useState } from 'react'
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './App.css'

function App() {

  // for login
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const toggleEvent = () => {
    if (type === "password") {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  }

  // for signup
  const [sign_pass, setsign_pass] = useState("");
  const [sign_type, setsign_type] = useState('password');
  const [sign_icon, setsign_icon] = useState(eyeOff);

  const sign_toggleEvent = () => {
    if (sign_type === "password") {
      setsign_icon(eye);
      setsign_type('text');
    } else {
      setsign_icon(eyeOff);
      setsign_type('password');
    }
  }

  const newUser = () => {
    const email = document.getElementById("new-email").value;
    const password = document.getElementById("new-pwd").value;
    if ((email || password) === "") {
      alert("please fill all the fields !!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        alert("registration successful");
        location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(error);
      });
  }

  const exisUser = () => {
    const ext_email = document.getElementById("email").value;
    const ext_password = document.getElementById("pwd").value;

    if ((ext_email || ext_password) === "") {
      alert("please enter correct email or password !!");
      return;
    }

    signInWithEmailAndPassword(auth, ext_email, ext_password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("login successful");
        location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(error);
      });
  }

  const loginClick = () => {
    document.getElementById("login").style.backgroundColor = "#1a75ff";
    document.getElementById("login").style.color = "white";
    document.getElementById("signup").style.backgroundColor = "#dce6f4";
    document.getElementById("signup").style.color = "black";
    document.getElementById("signup-form-inner").style.display = "none";
    document.getElementById("login-form-inner").style.display = "flex";
  }

  const signupClick = () => {
    document.getElementById("login").style.backgroundColor = "#dce6f4";
    document.getElementById("login").style.color = "black";
    document.getElementById("signup").style.backgroundColor = "#1a75ff";
    document.getElementById("signup").style.color = "white";
    document.getElementById("signup-form-inner").style.display = "flex";
    document.getElementById("login-form-inner").style.display = "none";
  }

  return (
    <div>
      <div id='head-nav'>
        <h1>Firebase Authentication</h1>
      </div>
      <div id='login-signup'>
        <div id='card'>
          <div className='card-top'>
            <input type="button" value="Login" id='login' onClick={loginClick} />
            <input type="button" value="SignUp" id='signup' onClick={signupClick} />
          </div>
          <div id='inner'>
            <div id='login-form-inner'>
              <div className='pass_div'>
                <input type="email" name="email" placeholder='Enter Email Address' id="email" />
              </div>
              <div className='pass_div'>
                <input type={type} name="pwd" placeholder='Enter your Password' id="pwd" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span>
                  <Icon style={{ cursor: "pointer" }} id='icon' icon={icon} size={25} onClick={toggleEvent} />
                </span>
              </div>
              <a href="#"><p>Forget Password ?</p></a>
              <input type="button" value="Login" id='login-btn' onClick={exisUser} />
              <p>Not a member ? <a href="#" id='sgn' onClick={signupClick}>SignUp Now</a></p>
            </div>
            <div id='signup-form-inner'>
              <div className='pass_div'>
                <input type="email" name="email" placeholder='Enter Email Address' id="new-email" />
              </div>
              <div className='pass_div'>
                <input type={sign_type} name="pwd" placeholder='Enter your Password' id="new-pwd" value={sign_pass} onChange={(e) => setsign_pass(e.target.value)} />
                <span>
                  <Icon style={{ cursor: "pointer" }} id='icon' icon={sign_icon} size={25} onClick={sign_toggleEvent} />
                </span>
              </div>
              <input type="button" value="SignUp" id='signup-btn' onClick={newUser} />
              {/* <p>Not a member ? <a href="#" id='sgn'>SignUp Now</a></p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
