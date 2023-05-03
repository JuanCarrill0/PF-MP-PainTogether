import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import LoginRegister from '../Views/LoginRegister';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginRegister />}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
