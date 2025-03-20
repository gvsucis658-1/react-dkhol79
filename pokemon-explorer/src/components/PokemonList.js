import React, { useState, useEffect } from 'react';
import '../index.css';

function PokemonList({ favorites, setFavorites }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const detailResponse = await fetch(poke.url);
            return detailResponse.json();
          })
        );

        setPokemon(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const addToFavorites = (poke) => {
    if (!favorites.some(fav => fav.id === poke.id)) {
      setFavorites([...favorites, poke]);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <h2>Pokémon List</h2>
      <div className="pokemon-grid">
        {pokemon.map((poke) => (
          <div key={poke.id} className="pokemon-card">
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              className="pokemon-image"
            />
            <h3 className="pokemon-name">{poke.name}</h3>
            <p className="pokemon-stats">
              Height: {poke.height/10}m | Weight: {poke.weight/10}kg
            </p>
            <div className="pokemon-types">
              {poke.types.map((type) => (
                <span key={type.type.name} className="type-badge">
                  {type.type.name}
                </span>
              ))}
            </div>
            <button
              onClick={() => addToFavorites(poke)}
              className="add-button"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;