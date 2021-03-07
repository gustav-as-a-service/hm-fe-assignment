import * as React from 'react';

export const CharacterPresentation = ({ search, starWarsCharacter }) => {
  const {
    name, eye_color: eyeColor, hair_color: hairColor, height, mass,
  } = starWarsCharacter;

  return (
    <div>
      {`Looking for ${search} we found ${name}. ${name} has ${hairColor} 
      colored hair and ${eyeColor} eyes. Highly debatable, but sources claim 
      they make up ${mass} kilograms across ${height} cm.`}
    </div>
  );
};
