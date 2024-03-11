import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        
        navigate('/todo');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
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