import "./App.css";


import CategoryCard from "./components/CategoryCard";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CategoryCard />
      </QueryClientProvider>
    </>
  );
}

export default App;
