const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'pokemon.json');

// Middleware
app.use(cors());
app.use(express.json());

// Load initial data
let pokemonData = [];
if (fs.existsSync(DATA_FILE)) {
  const rawData = fs.readFileSync(DATA_FILE);
  pokemonData = JSON.parse(rawData);
} else {
  // Seed with initial data if file doesn’t exist
  pokemonData = [
    { id: 1, name: "Pikachu", height: 4, weight: 60, type: "electric", sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(pokemonData, null, 2));
}

// CRUD Routes
// Read all Pokémon
app.get('/api/pokemon', (req, res) => {
  res.json(pokemonData);
});

// Create a Pokémon
app.post('/api/pokemon', (req, res) => {
  const newPokemon = {
    id: pokemonData.length ? Math.max(...pokemonData.map(p => p.id)) + 1 : 1,
    name: req.body.name,
    height: req.body.height,
    weight: req.body.weight,
    type: req.body.type,
    sprite: req.body.sprite || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
  };
  pokemonData.push(newPokemon);
  fs.writeFileSync(DATA_FILE, JSON.stringify(pokemonData, null, 2));
  res.status(201).json(newPokemon);
});

// Update a Pokémon
app.put('/api/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemonData.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Pokémon not found' });

  pokemonData[index] = { ...pokemonData[index], ...req.body, id };
  fs.writeFileSync(DATA_FILE, JSON.stringify(pokemonData, null, 2));
  res.json(pokemonData[index]);
});

// Delete a Pokémon
app.delete('/api/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemonData.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Pokémon not found' });

  const deleted = pokemonData.splice(index, 1)[0];
  fs.writeFileSync(DATA_FILE, JSON.stringify(pokemonData, null, 2));
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});