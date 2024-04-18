import "./App.css";

//React router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CategoryCard from "./components/CategoryCard";
//React query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Router Components
import CategoryPage, { loader as categoriesLoader } from "./pages/CategoryPage";
import PokemonPage, { loader as pokemonLoader } from "./pages/PokemonPage";
import RootPage from "./pages/RootPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          index: true,
          element: <CategoryCard />,
        },
        {
          path: "/category/:categoryId",
          children: [
            {
              index: true,
              element: <CategoryPage />,
              loader: categoriesLoader,
            },
            {
              path: "/category/:categoryId/:pokemonName",
              element: <PokemonPage />,
              loader: pokemonLoader,
            },
          ],
        },
      ],
    },
    {},
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
