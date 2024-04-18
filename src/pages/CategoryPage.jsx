import axios from "axios";

import { useLoaderData, useParams, json } from "react-router";
import { Link } from "react-router-dom";

import styled from "styled-components";


//     Styled Components

const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  list-style: none;
`;
const Card = styled(Link)`
  background-color: #ff9a03;
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
  text-transform: capitalize;
  text-decoration: none;
`;

const CategoryPage = () => {
  //react router
  const pokemonData = useLoaderData();
  //extracting the pokemon information from the response
  const pokemons = pokemonData.pokemon;
  return (
    <>

      <CardList>
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.pokemon.name}
            //pass the name of pokemon to URL of browser
            to={`${pokemon.pokemon.name}`}
          >
            <ListItem>{pokemon.pokemon.name}</ListItem>
          </Card>
        ))}
      </CardList>
    </>
  );
};

export default CategoryPage;

//loader function

export const loader = async ({ params }) => {
  const id = params.categoryId;
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);

  //error handling
  if (response.status !== 200) {
    throw json({ message: "Error fetching Pokemons" }, { status: 500 });
  }

  //returning the response data to use as Loader data
  return response.data;

};
