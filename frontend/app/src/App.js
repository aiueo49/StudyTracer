import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import User from './User';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen justify-between"> 
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:userID" element={<User />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
