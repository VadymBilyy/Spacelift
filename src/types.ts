interface CharactersInfo {
    count: number;
    pages: number;
    next: number;
  }
  
  export interface CharactersResultItem {
    id: string;
    image: string;
    name: string;
    species: string;
  }
  
  export interface RickAndMortyDataResponse {
    characters: {
      info: CharactersInfo;
      results: CharactersResultItem[];
    };
  }