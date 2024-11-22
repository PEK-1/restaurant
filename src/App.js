import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar, LoginRegister, BookTable } from './components';
import './App.css';

const App = () => {
  const [menuData, setMenuData] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Menu Data:', data);
      setMenuData(data);
    })
      .catch((error) => setError(error.message)); 
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={
            <>
              <Header />
              <AboutUs />
              <SpecialMenu menuData={menuData} />
              <Chef />
              <Intro />
              <Laurels />
              <Gallery />
              <FindUs />
              <Footer />
            </>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/book-table' element={<BookTable />} />
        </Routes>
        {error && <p>Error: {error}</p>}
      </div>
    </Router>
  );
};

export default App;
