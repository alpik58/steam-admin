import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Action from "./Components/Action.jsx";
import Racing from "./Components/Racing.jsx";
import { Anime } from "./Components/Anime.jsx";
import Gamedetails from "./Components/Gamedetails.jsx";
import Addgame from "./Components/Addgame.jsx";
import Editgame from "./Components/Editgame.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/action",
    element: <Action />,
  },
  {
    path: "/racing",
    element: <Racing />,
  },
  {
    path: "/anime",
    element: <Anime />,
  },
  {
    path: "/gamedetails/:id",
    element: <Gamedetails />,
  },
  {
    path: "/addgame",
    element: <Addgame />,
  },
  {
    path: "/editgame/:id",
    element: <Editgame />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
