import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import Followers from "./components/Followers";
import SavedUser from "./components/SavedUser";
import RepoInfo from "./components/RepoInfo";

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userProfile",
        element: <UserDetails />,
      },
      {
        path: "/userProfile/followers",
        element: <Followers />,
      },
      { path: "/savedUsers", element: <SavedUser /> },
      { path: "/userProfile/repoInfo", element: <RepoInfo /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
