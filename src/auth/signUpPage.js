import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 

const SignUpPage = () => {
  const [fullName, setFullName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
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
    <body className="body-signup">
      <div className="signupContainer">
        <div className="signup-form">
          <form onSubmit={handleSignUp}>
            <input
              className="input-signup"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="input-signup"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-signup"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signup-button" type="submit">Sign Up</button>
          </form>
          <div className="signup-links">
            <a className="a-signup" href="/login">Login</a>
          </div>
        </div>
      </div>
    </body>
  );
};

export default SignUpPage;
