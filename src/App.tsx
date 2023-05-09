import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './Views/LoginRegister';
import Canvas from './Views/Canvas';
import { useEffect, useState } from 'react';

function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      setAccessToken(() => token);
    }
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem('access_token');
      if (token !== null) {
        setAccessToken(() => token);
      } else {
        setAccessToken(() => "");
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Canvas />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;








