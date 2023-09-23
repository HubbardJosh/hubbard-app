import { ThemeProvider } from "@emotion/react";
import { Home } from "../Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RouteLayout } from "../Routes/RouteLayout";
import { materialTheme } from "../../styles/theme/materialTheme";
import { AnimeSearch } from "../AnimeSearch/AnimeSearch";
// import { useState } from "react";
// import { AgeVerificationModal } from "../Shared/AgeVerificationModal/AgeVerificationModal";

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
  // const [isAgeVerified, setIsAgeVerified] = useState(false);

  // const handleAgeVerification = () => {
  //   setIsAgeVerified(true);
  // };
  return (
    <>
      {/* {isAgeVerified ? ( */}
      <ThemeProvider theme={materialTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      {/* ) : (
        <AgeVerificationModal
          onVerified={handleAgeVerification}
          isOpen
          onClose={() => null}
        />
      )} */}
    </>
  );
}

export default App;
