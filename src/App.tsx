import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import RecipePage from "./pages/RecipePage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import BookmarksPage from "./pages/BookmarksPage";
import BookmarkedRecipePage from "./pages/BookmarkedRecipePage";
import MyAccountPage from "./pages/MyAccountPage";
import PostFormPage from "./pages/PostFormPage";
import ExplorePage from "./pages/ExplorePage";
import ExploreRecipePage from "./pages/ExploreRecipePage";
import MyRecipePage from "./pages/MyRecipePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/recipe",
        element: <RecipePage />,
      },
      {
        path: "/bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "/bookmarked-recipe",
        element: <BookmarkedRecipePage />,
      },
      {
        path: "/my-account",
        element: <MyAccountPage />,
      },
      {
        path: "/my-recipe-page",
        element: <MyRecipePage />,
      },
      {
        path: "/post-form",
        element: <PostFormPage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      { path: "/explore-recipe", element: <ExploreRecipePage /> },
    ],
  },
]);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
