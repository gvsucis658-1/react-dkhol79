import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import FavoritePokemon from './components/FavoritePokemon';
import './index.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pokémon Explorer</h1>
      </header>
      <main className="app-main">
        <PokemonList favorites={favorites} setFavorites={setFavorites} />
        <FavoritePokemon favorites={favorites} setFavorites={setFavorites} />
      </main>
    </div>
  );
}

export default App;