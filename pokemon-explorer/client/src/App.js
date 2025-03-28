import React from 'react';
import PokemonManager from './components/PokemonManager';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pokémon Manager</h1>
      </header>
      <main className="app-main">
        <PokemonManager />
      </main>
    </div>
  );
}

export default App;