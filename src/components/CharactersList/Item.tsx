/**
 * CharacterListItem
 *
 * Lists the picture name and species
 */

import React from "react";
import { Link } from "react-router-dom";
import { CharactersResultItem } from "../../types";

import "./styles.css";

type CharacterListItemProp = {
  item: CharactersResultItem;
};

const CharacterListItem = React.forwardRef<
  HTMLLIElement,
  CharacterListItemProp
>(({ item }, ref) => (
  <li className="list__item" ref={ref}>
    <div className="list__content">
      <div className="character-list-item">
        <img
          className="character-list-item__img"
          src={item.image}
          alt={item.name}
        />
        <Link to={`/caracter/${item.id}`}>
          <div className="character-list-item__text">{item.name}</div>
        </Link>
        <div className="character-list-item__text">{item.species}</div>
      </div>
    </div>
  </li>
));

export default CharacterListItem;
