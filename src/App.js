import React from 'react';
import MainList from './components/MainList';
import "./App.css";
import Adding from './components/Adding';

function App() {
  return (
    <div className="App">
      Shopping list
      <Adding/>
      <MainList/>
    </div>
  );
}

export default App;
