import React from 'react';
import './App.css';
import DataContainer from './Components/DataContainer/dataContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>New York Times Top News Data</h2>
      </header>
      <main>
        <DataContainer/>
      </main>
    </div>
  );
}

export default App;
