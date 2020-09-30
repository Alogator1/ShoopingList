import React from 'react';
import MainList from './components/MainList';
import "./App.css";
import Adding from './components/Adding';

function App() {
  // localStorage.setItem("List", JSON.stringify([
  //   {apple: "ran out"},
  //   {bread: "have"}
  // ]))
  return (
    <div className="App">
      Shopping list
      <Adding/>
      <MainList/>
    </div>
  );
}

export default App;
