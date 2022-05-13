/* eslint-disable no-unused-vars */
import './App.css';
import Home from './Home.js';
import About from './About.js';
import Account from './Account.js';
import Admin from './Admin.js';
import Login from './Login.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Workbox } from 'workbox-window';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');
      wb.register();
    }
  }, []);

  return (
    <Router>
      <header>
        <h1>
          <Link to="/">PWA on SWA Starter</Link>
        </h1>
        <Link to="/about" className="about">
          About
        </Link>
      </header>
      <div className="body">
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <footer>
        <p>
          Made in 🇳🇴&nbsp; by&nbsp;
          <a href="https://twitter.com/webmaxru/">Maxim Salnikov</a> |&nbsp;
          <a href="https://github.com/webmaxru/pwa-on-swa">GitHub</a>
        </p>
      </footer>
    </Router>
  );
}

export default App;
