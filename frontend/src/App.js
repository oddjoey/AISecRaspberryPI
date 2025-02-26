import React from 'react';
import './App.css';
import Navbar from './Navbar';
import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      <Navbar /> {/* Make sure this line is present to render the Navbar */}
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A Better Way to Secure Your Home.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
