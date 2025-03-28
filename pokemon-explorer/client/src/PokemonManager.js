import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function PokemonManager() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    height: '',
    weight: '',
    type: '',
    sprite: ''
  });

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pokemon');
      setPokemon(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      height: parseFloat(formData.height) * 10, // Convert to decimeters
      weight: parseFloat(formData.weight) * 10, // Convert to hectograms
      type: formData.type,
      sprite: formData.sprite
    };

    try {
      if (formData.id) {
        // Update
        await axios.put(`http://localhost:5000/api/pokemon/${formData.id}`, data);
      } else {
        // Create
        await axios.post('http://localhost:5000/api/pokemon', data);
      }
      fetchPokemon();
      resetForm();
    } catch (error) {
      console.error('Error saving Pokémon:', error);
    }
  };

  const handleEdit = (poke) => {
    setFormData({
      id: poke.id,
      name: poke.name,
      height: poke.height / 10,
      weight: poke.weight / 10,
      type: poke.type,
      sprite: poke.sprite
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pokemon/${id}`);
      fetchPokemon();
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
    }
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', height: '', weight: '', type: '', sprite: '' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="manager-container">
      <h2>{formData.id ? 'Edit Pokémon' : 'Add New Pokémon'}</h2>
      <form onSubmit={handleSubmit} className="pokemon-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="form-input"
          required
        />
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          placeholder="Height (m)"
          className="form-input"
          step="0.1"
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="Weight (kg)"
          className="form-input"
          step="0.1"
          required
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          placeholder="Type"
          className="form-input"
          required
        />
        <input
          type="url"
          name="sprite"
          value={formData.sprite}
          onChange={handleInputChange}
          placeholder="Image URL (optional)"
          className="form-input"
        />
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            {formData.id ? 'Update' : 'Create'}
          </button>
          {formData.id && (
            <button type="button" onClick={resetForm} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Pokémon List</h2>
      <div className="pokemon-grid">
        {pokemon.map((poke) => (
          <div key={poke.id} className="pokemon-card">
            <img src={poke.sprite} alt={poke.name} className="pokemon-image" />
            <h3 className="pokemon-name">{poke.name}</h3>
            <p className="pokemon-stats">
              H: {poke.height / 10}m | W: {poke.weight / 10}kg | Type: {poke.type}
            </p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(poke)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(poke.id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonManager;