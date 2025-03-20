import React, { useState } from 'react';
import '../index.css';

function FavoritePokemon({ favorites, setFavorites }) {
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    height: '',
    weight: '',
    type: '',
    sprite: ''
  });

  const handleInputChange = (e) => {
    setNewPokemon({
      ...newPokemon,
      [e.target.name]: e.target.value
    });
  };

  const addCustomPokemon = (e) => {
    e.preventDefault();
    const customPoke = {
      id: Date.now(),
      name: newPokemon.name,
      height: parseFloat(newPokemon.height) * 10,
      weight: parseFloat(newPokemon.weight) * 10,
      types: [{ type: { name: newPokemon.type } }],
      sprites: {
        front_default: newPokemon.sprite || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
      }
    };
    setFavorites(prev => [...prev, customPoke]);
    setNewPokemon({ name: '', height: '', weight: '', type: '', sprite: '' });
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(poke => poke.id !== id));
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Pokémon</h2>

      <form onSubmit={addCustomPokemon} className="add-form">
        <h3>Add Custom Pokémon</h3>
        <input
          type="text"
          name="name"
          value={newPokemon.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="form-input"
          required
        />
        <input
          type="number"
          name="height"
          value={newPokemon.height}
          onChange={handleInputChange}
          placeholder="Height (m)"
          className="form-input"
          step="0.1"
          required
        />
        <input
          type="number"
          name="weight"
          value={newPokemon.weight}
          onChange={handleInputChange}
          placeholder="Weight (kg)"
          className="form-input"
          step="0.1"
          required
        />
        <input
          type="text"
          name="type"
          value={newPokemon.type}
          onChange={handleInputChange}
          placeholder="Type"
          className="form-input"
          required
        />
        <input
          type="url"
          name="sprite"
          value={newPokemon.sprite}
          onChange={handleInputChange}
          placeholder="Image URL (optional)"
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Add Pokémon
        </button>
      </form>

      {favorites.length === 0 ? (
        <p className="empty-message">No favorite Pokémon yet!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((poke) => (
            <div key={poke.id} className="favorite-item">
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="favorite-image"
              />
              <div className="favorite-details">
                <h3 className="favorite-name">{poke.name}</h3>
                <p className="favorite-stats">
                  H: {poke.height/10}m | W: {poke.weight/10}kg | Type: {poke.types[0].type.name}
                </p>
              </div>
              <button
                onClick={() => removeFavorite(poke.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePokemon;