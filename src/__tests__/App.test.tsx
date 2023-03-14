import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";
import { GET_CHARACTERS } from "../queries";

const mockData = {
  characters: {
    info: {
      count: 394,
      pages: 20,
      next: 2,
    },
    results: [
      {
        id: 1,
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        name: "Rick Sanchez",
        species: "Human",
      },
      {
        id: 2,
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        name: "Morty Smith",
        species: "Human",
      },
      {
        id: 3,
        image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        name: "Summer Smith",
        species: "Human",
      },
    ],
  },
};

const mockError = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1, name: "" },
  },
  error: new Error("Something went wrong"),
};

const mockValidResponse = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1, name: "" },
  },
  result: { data: mockData },
};

describe("App component", () => {
  it("should render loading indicator when data is not yet loaded", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockValidResponse]} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const loadingIndicator = getByTestId("loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();
  });

  it("should render error message when there is an error", async () => {
    const { getByText } = render(
      <MockedProvider mocks={[mockError]} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => {
      const errorMessage = getByText("Something went wrong, please try again!");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should render list of characters when data is loaded", async () => {
    window.IntersectionObserver = jest.fn(() => {
      const instance = {
        thresholds: [],
        root: null,
        rootMargin: "",
        observe: jest.fn(),
        takeRecords: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
      return instance;
    });

    const { getByText } = render(
      <Router>
        <MockedProvider mocks={[mockValidResponse]} addTypename={false}>
          <App />
        </MockedProvider>
      </Router>
    );
    await waitFor(() => {
      const rickSanchezName = getByText("Rick Sanchez");
      const mortySmithName = getByText("Morty Smith");
      const summerSmithName = getByText("Summer Smith");
      expect(rickSanchezName).toBeInTheDocument();
      expect(mortySmithName).toBeInTheDocument();
      expect(summerSmithName).toBeInTheDocument();
    });
  });
});
