import { Autocomplete, TextField } from "@mui/material";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useNavigate } from "react-router-dom";

//Styled Components
const Container = styled.div`
  padding-left: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    color: #ffdda9;
    margin-block: 30px 10px;
    font-family: monospace;
    font-weight: bold;
  }
`;
const AutocompleteContainer = styled.div`
  background: white;
  width: fit-content;
  padding: 8px;
  border-radius: 5px;
`;

// Function to fetch Pokemon data asynchronously

const retrievePokemons = async () => {
  try {
    // Make an HTTP GET request to the PokéAPI using Axios
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1500"
    );

    // Check for successful response (status code 200)
    if (response.status === 200) {
      // Extract the data from the response object
      return response.data;
    } else {
      // Handle errors if the response status is not 200
      console.error("Error fetching Pokemon data:", response.statusText);
      throw new Error("Failed to retrieve Pokemon data"); // Re-throw for potential error handling in caller
    }
  } catch (error) {
    // Handle any other errors during the request
    console.error("Error fetching Pokemon data:", error);
    throw error; // Re-throw for potential error handling in caller
  }
};

const Search = () => {
  const navigate = useNavigate(); // Get the navigate function for navigation

  // Destructure the returned object from useQuery
  const {
    data: pokemons, // Data fetched from the query, named 'pokemons'
    error, //Error object if the query failed
    isLoading, // Boolean indicating if the query is still loading
  } = useQuery({
    queryKey: ["pokemonData"], // Unique identifier for the query
    queryFn: () => retrievePokemons(), // Function to fetch pokemons data
  });

  // Handle loading and error states
  if (isLoading) return <div>Fetching Categories...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  // Access the results from the fetched data (assuming 'results' property)
  const results = pokemons.results;

  // Function triggered when a selection is made in the Autocomplete component
  const handleSelect = (event, value) => {
    if (value) {
      // Check if a value is actually selected
      const selectedPokemon = value; //Extract the name of the selected Pokemon
      navigate(`${selectedPokemon}`); // Navigate to the Pokemon Page
    }
  };

  return (
    <>
      <Container>
        <h1>Search</h1>
        <AutocompleteContainer>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={results.map((option) => option.name)}
            sx={{ width: "30rem" }} // Inline styling with Material-UI sx prop
            renderInput={(params) => (
              <TextField {...params} label="Search For Pokemons" />
            )}
            onChange={handleSelect} // Handle selection event
          />
        </AutocompleteContainer>
      </Container>
    </>
  );
};

export default Search;
