import React, { useState, useEffect } from 'react';
import CharactersDetails from '../CharacterDetails';
import '../App.css';

const CharactersComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    house: '', 
    species: '',
  });
  const [count, setCount] = useState(6);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true); // For loading spinner
  const [error, setError] = useState(''); // For error messages

  useEffect(() => {
    setLoading(true);
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then(response => response.json())
      .then(data => {
        setCharacters(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load characters. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
  };

  const handleAddToFavorites = (character) => {
    if (!favorites.some(fav => fav.name === character.name)) {
      setFavorites([...favorites, character]);
    }
  };

  const handleRemoveFromFavorites = (character) => {
    setFavorites(favorites.filter(fav => fav.name !== character.name));
  };

  const filteredCharacters = characters.filter(character => {
    return (
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.gender ? character.gender === filters.gender : true) &&
      (filters.house ? character.house === filters.house : true) &&
      (filters.species ? character.species === filters.species : true)
    );
  });

  return (
    <div>
      <h2>Harry Potter Characters</h2>

      {/* Search and Filters */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        style={{ padding: '10px', marginBottom: '20px' }}
      />
      <div>
        <label>
          Gender:
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          House:
          <select name="house" value={filters.house} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Slytherin">Slytherin</option>
            <option value="Ravenclaw">Ravenclaw</option>
            <option value="Hufflepuff">Hufflepuff</option>
          </select>
        </label>
        <label>
          Species:
          <select name="species" value={filters.species} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="human">Human</option>
            <option value="half-giant">Half-Giant</option>
          </select>
        </label>
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="CharacterGrid">
          {filteredCharacters.slice(0, count).map(character => (
            <div
              className="Character"
              key={character.name}
              onClick={() => handleCharacterSelect(character)}
            >
              <img id='image' src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>DOB: {character.dateOfBirth}</p>
              <p>Species: {character.species}</p>
              <button onClick={() => handleAddToFavorites(character)}>Add to Favorites</button>
            </div>
          ))}
        </div>
      )}

      {/* Show More / Show Less Buttons */}
      <div>
        {count < filteredCharacters.length && (
          <button onClick={() => setCount(count + 5)}>Show More</button>
        )}
        {count > 5 && (
          <button onClick={() => setCount(5)}>Show Less</button>
        )}
      </div>

      {/* Favorites Section */}
      <h3>Your Favorite Characters</h3>
      <div className="FavoritesGrid">
        {favorites.length > 0 ? (
          favorites.map(fav => (
            <div key={fav.name} className="Character">
              <img id='image' src={fav.image} alt={fav.name} />
              <h3>{fav.name}</h3>
              <p>DOB: {fav.dateOfBirth}</p>
              <p>Species: {fav.species}</p>
              <button onClick={() => handleRemoveFromFavorites(fav)}>Remove from Favorites</button>
            </div>
          ))
        ) : (
          <p>No favorite characters yet.</p>
        )}
      </div>

      {/* Character Details */}
      {selectedCharacter && (
        <div className="selected-character-container">
          <button
            className="close-button"
            onClick={handleCloseDetails}
          >
            Close
          </button>
          <CharactersDetails character={selectedCharacter} />
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        Back to Top
      </button>
    </div>
  );
};

export default CharactersComponent;