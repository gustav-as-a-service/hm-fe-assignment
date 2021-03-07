import * as React from 'react';
import { StarWarsCharacter } from '../organisms/Suggestions/hooks/useStarWarsSearch';

type CharacterPresentationProps = {
  starWarsCharacter: StarWarsCharacter
  search: string
};

export const CharacterPresentation: React.FC<CharacterPresentationProps> = ({ search, starWarsCharacter }: CharacterPresentationProps) => {
  const {
    name, eye_color, hair_color, height, mass,
  } = starWarsCharacter;

  return (
    <div>
      {`Looking for ${search} we found ${name}. ${name} has ${hair_color} 
			colored hair and ${eye_color} eyes. Highly debatable, but sources claim 
			they make up ${mass} kilograms across ${height} cm.`}
    </div>
  );
};
