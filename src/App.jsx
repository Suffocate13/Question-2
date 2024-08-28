import React, { useState } from 'react';
import CharactersComponent from './components/CharacterComponent';
import PhoneModels from './components/PhoneModels';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div>
      <CharactersComponent onSelectCharacter={setSelectedCharacter} />
      {selectedCharacter && (
        <CharacterDetails character={selectedCharacter} onBack={() => setSelectedCharacter(null)} />
      )}
 
    </div>
  );
}

export default App