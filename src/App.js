import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar, LoginRegister, BookTable } from './components';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={
          <>
          <Header />
          <AboutUs />
          <SpecialMenu />
          <Chef />
          <Intro />
          <Laurels />
          <Gallery />
          <FindUs />
          <Footer />
          </>
        } />
          <Route path='/login' Component={LoginRegister} />
          <Route path='/register' Component={LoginRegister} />
          <Route path='/book-table' Component={BookTable} />
        </Routes>
      </div>
    </Router>
);

export default App;
