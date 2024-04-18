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
  // Destructure the returned object from useQuery
  const {
    data: categories, // Data fetched from the query, named 'categories'
    error, // Error object if the query failed
    isLoading, // Boolean indicating if the query is still loading
  } = useQuery({
    queryKey: ["categoryData"], // Unique identifier for the query
    queryFn: () => retrieveCategories(), // Function to fetch category data
  });

  // Handle loading and error states
  if (isLoading) return <div>Fetching Categories...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

// Access the results from the fetched data (assuming 'results' property)
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
