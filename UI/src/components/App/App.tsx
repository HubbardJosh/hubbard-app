import { ThemeProvider } from "@emotion/react";
import { Home } from "../Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RouteLayout } from "../Routes/RouteLayout";
import { materialTheme } from "../../styles/theme/materialTheme";
import { AnimeSearch } from "../AnimeSearch/AnimeSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/anime-search",
        element: <AnimeSearch />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
