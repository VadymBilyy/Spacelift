import { useContext, useEffect, useState } from "react";
import { useQuery, ApolloError, getApolloContext } from "@apollo/client";
import { RickAndMortyDataResponse } from "./types";
import { GET_CHARACTERS } from "./queries";
import Header from "./components/Header";
import ErrorHandler from "./components/Error";
import CharactersList from "./components/CharactersList";
import LoadingIndicator from "./components/LoadingIndicator";
import "./App.css";

const getErrorMessage = (error: ApolloError): string => error.message;

function App() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { loading, error, data, fetchMore } =
    useQuery<RickAndMortyDataResponse>(GET_CHARACTERS, {
      variables: { page, name },
    });

  const apolloContext = useContext(getApolloContext());

  const fetchNextResults = (page: number, name: string) => {
    fetchMore({
      variables: { page, name },
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoading(false);
        if (page === 1) {
          return fetchMoreResult;
        }
        return fetchMoreResult
          ? {
              characters: {
                ...fetchMoreResult.characters,
                results: [
                  ...prev.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            }
          : prev;
      },
    });
  };

  const clearLocalState = () => {
    setPage(1);
    setName("");
    apolloContext.client?.clearStore();
  };

  useEffect(() => {
    return () => clearLocalState();
  }, []);

  const handleError = () => fetchNextResults(page, name);

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!isLoading && (name || !data?.characters.results.length)) {
      setPage(1);
      setLoading(true);
      fetchNextResults(1, name);
    }
  };

  const handleLoad = () => {
    const isMoreResultsExists = !!data?.characters.info.next;
    if (!isLoading && isMoreResultsExists) {
      setLoading(true);
      setPage(page + 1);
      fetchNextResults(page + 1, name);
    }
  };

  if (loading && !data)
    return (
      <div className="app-wrapper loading-wrapper">
        <LoadingIndicator />
      </div>
    );

  if (error && !data) {
    return <ErrorHandler onRefetch={handleError} />;
  }

  return data ? (
    <div className="app-wrapper">
      <Header />
      <div>
        <section className="text-center">
          <h2>Welcome to Rick and Morty character database!</h2>
          <p>You can find all important informations on docs page</p>
          {error && <ErrorHandler onRefetch={handleError} />}
          <form>
            <input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Search by name"
            />
            <button type="submit" onClick={handleSearch}>
              Search
            </button>
          </form>
        </section>
        <section className="text-center">
          <CharactersList
            loading={isLoading}
            error={error ? getErrorMessage(error) : error}
            characters={data.characters.results}
            onLoad={handleLoad}
          />
        </section>
      </div>
    </div>
  ) : null;
}

export default App;
