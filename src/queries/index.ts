import { gql} from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
      }
      results {
        id
        image
        name
        species
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
        id
        image
        name
        species
        episode {
          id
          name
        }
    }
  }
`;