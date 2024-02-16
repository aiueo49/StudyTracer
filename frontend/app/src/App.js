import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';

function App() {
  return (
    <Router>
      <Header /> {/* Headerコンポーネントを挿入 */}
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
