import { useCallback, useRef } from "react";
import { CharactersResultItem } from "../../types";
import LoadingIndicator from "../LoadingIndicator";
import CharacterListItem from "./Item";

type CharactersListProps = {
  loading: boolean;
  error?: string;
  characters: CharactersResultItem[];
  onLoad: () => void;
};

function CharactersList({ loading, characters, onLoad }: CharactersListProps) {
  const observer = useRef<IntersectionObserver>();

  const lastCharacterRef = useCallback(
    (node: HTMLLIElement) => {
      if (!loading) {
        observer.current && observer.current.disconnect();

        observer.current = new IntersectionObserver(
          (entries) => {
            if (characters?.length > 10 && entries[0].isIntersecting) {
              onLoad();
            }
          },
          { root: document.querySelector("#scrollArea") }
        );

        if (node) observer.current.observe(node);
      }
    },
    [characters, loading]
  );

  return characters ? (
    <div className="list__wrapper" id={"scrollArea"}>
      {loading && (
        <div className="loading-wrapper">
          <LoadingIndicator />
        </div>
      )}
      <ul className="list">
        {characters.map((item) => (
          <CharacterListItem item={item} key={item.id} ref={lastCharacterRef} />
        ))}
      </ul>
    </div>
  ) : null;
}

export default CharactersList;
