import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigate('/todo');
        })
        .catch((error) => {
          alert(error.message); 
        });
    };
  
    const handleGoogleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          navigate('/todo'); 
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          alert(errorMessage);
        });
    };
  
    return (
      <body className="body-login">
        <div className="loginContainer">
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <input
                className="input-login"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-login"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" type="submit">Login</button>
            </form>
            <button className="login-button google" onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
            <div className="login-links">
              <Link className="a-login" to="/signup">Sign up</Link>
              <a className="a-login" href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </body>
    );
  };
  

export default LoginPage;