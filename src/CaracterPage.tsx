import { useParams } from "react-router-dom";
import { useQuery, ApolloError, getApolloContext } from "@apollo/client";
import "./App.css";
import { GET_CHARACTER } from "./queries";

function CaracterPage() {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  console.log("data: ", data);

  return data ? (
    <div>
      <ul>
        <li>name: {data.character.name}</li>
        <li>
          image: <img src={data.character.image} />
        </li>
        <li>
          Episodes:
          {data.character.episode.length &&
            data.character.episode.map((episode: any) => (
              <li key={episode.id}>{episode.name}</li>
            ))}
          <ul></ul>
        </li>
      </ul>
    </div>
  ) : null;
}

export default CaracterPage;
