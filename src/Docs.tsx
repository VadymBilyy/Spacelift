import React from "react";
import Header from "./components/Header";
import "./App.css";

function Docs() {
  return (
    <div className="app-wrapper">
      <Header />
      <div>
        <h2>API</h2>
        <p>
          This database use {` `}
          <a
            href="https://rickandmortyapi.com/documentation/#graphql"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rick and Morty GraphQL API
          </a>
          {` `} as data source
        </p>
        <h2>Types</h2>
        <p>
          Types definitions for API can be found {` `}
          <a
            href="https://javascript.rickandmortyapi.com/modules/interfaces.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Docs;
