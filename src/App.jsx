import "./App.css";

//React router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//React query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Router Components
import CategoryPage, { loader as categoriesLoader } from "./pages/CategoryPage";
import PokemonPage, { loader as pokemonLoader } from "./pages/PokemonPage";
import RootPage from "./pages/RootPage";
import MainPage from "./pages/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: ":pokemonName",
          element: <PokemonPage />,
          loader: pokemonLoader,
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
