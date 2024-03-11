import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './auth/LoginPage'; 
import SignUpPage from './auth/signUpPage';
import { TodoWrapper } from './components/TodoWrapper';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/todo" element={<TodoWrapper />} />
    </Routes>
  );
}

export default App;
