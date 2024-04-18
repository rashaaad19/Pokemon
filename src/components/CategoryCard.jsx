import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

//fetching the categories from API with Axios
const retrieveCategories = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/type");
  return response.data;
};

const CategoryCard = () => {

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => retrieveCategories(), // Fetch category details based on ID
  });

  if (isLoading) return <div>Fetching Categories...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const results = categories.results;

  //functions

  return (
    <>
      <CardList>
        {results.map((category) => (
          <Card
            key={category.url}
            //extractin the id from the url of category
            to={`/category/${category.url.split("/")[6]}`}
          >
            <ListItem>{category.name}</ListItem>
          </Card>
        ))}
      </CardList>
    </>
  );
};

export default CategoryCard;
