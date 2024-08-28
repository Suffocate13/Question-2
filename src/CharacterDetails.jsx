import React from 'react';

const CharacterDetails = ({ character }) => {
  return (
    <div style={{ backgroundColor: '#f4ede4', color: '#4b2e2e', padding: '20px' }}>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p><strong>DOB:</strong> {character.dateOfBirth}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>House:</strong> {character.house}</p>
      <p><strong>Ancestry:</strong> {character.ancestry}</p>
      <p><strong>Patronus:</strong> {character.patronus}</p>
      <p><strong>Actor:</strong> {character.actor}</p>
    </div>
  );
};

export default CharacterDetails;
