import { Autocomplete, TextField } from "@mui/material";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useNavigate } from 'react-router-dom';



const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
];
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




const retrievePokemons = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1500");
  return response.data;
};



const Search = () => {

const navigate=useNavigate();


  const {
    data: pokemons,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemonData"],
    queryFn: () => retrievePokemons(), 
  });

  if (isLoading) return <div>Fetching Categories...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const results = pokemons.results;
console.log(results)



const handleSelect = (event, value) => {
  if (value) {
    const selectedPokemon=value;
    navigate(`${selectedPokemon}`)
    console.log('Selected Pokemon:', value); 
    console.log(event)
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
