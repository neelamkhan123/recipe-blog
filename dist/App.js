import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
// import { useEffect, useRef, useState } from "react";
var router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(RootLayout, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}) },
            { path: "/auth", element: _jsx(AuthPage, {}) },
        ],
    },
]);
// interface Item {
//   id: number;
//   title: string;
// }
// interface Recipe {
//   readonly id: number;
//   title: string;
//   image: string;
//   servings: number;
//   readyInMinutes: number;
//   dairyFree: boolean;
//   glutenFree: boolean;
//   ketogenic: boolean;
//   vegan: boolean;
//   vegetarian: boolean;
//   extendedIngredients: {
//     original: string;
//   }[];
// }
var App = function () {
    // const inputRef = useRef<HTMLInputElement>(null);
    // const [query, setQuery] = useState("");
    // const [queryResults, setQueryResults] = useState<Item[]>([]);
    // const [showList, setShowList] = useState(false);
    // const [id, setId] = useState(716429);
    // const [recipeOutput, setRecipeOutput] = useState<Recipe[]>([]);
    // const recipe: Recipe[] = [];
    // const recipeInfo = (info: Recipe) => {
    //   const recipeData: Recipe = {
    //     id: info.id,
    //     title: info.title,
    //     image: info.image,
    //     servings: info.servings,
    //     readyInMinutes: info.readyInMinutes,
    //     dairyFree: info.dairyFree,
    //     glutenFree: info.glutenFree,
    //     ketogenic: info.ketogenic,
    //     vegan: info.vegan,
    //     vegetarian: info.vegetarian,
    //     extendedIngredients: info.extendedIngredients.map((ing) => ({
    //       original: ing.original,
    //     })),
    //   };
    //   // setRecipeOutput(recipeData);
    //   recipe.push(recipeData);
    //   setRecipeOutput(recipe);
    //   // console.log(recipe);
    // };
    // const handleSubmit = (e: React.FormEvent) => {
    //   e.preventDefault();
    //   setQuery(inputRef.current!.value);
    //   inputRef.current!.value = "";
    //   setShowList(true);
    // };
    // const selectResultHandler = (id: number) => {
    //   setId(id);
    // };
    // useEffect(() => {
    //   const getPosts = async () => {
    //     try {
    //       const res = await fetch(
    //         `https://api.spoonacular.com/recipes/complexSearch?apiKey=8d4c6012caa14184b35f48eb2e74d415&query=${query}`
    //       );
    //       const data = await res.json();
    //       const { results } = data;
    //       setQueryResults(results);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    //   getPosts();
    // }, [query]);
    // useEffect(() => {
    //   const getRecipe = async () => {
    //     try {
    //       const res = await fetch(
    //         `https://api.spoonacular.com/recipes/${id}/information?apiKey=8d4c6012caa14184b35f48eb2e74d415&includeNutrition=false`
    //       );
    //       const data = await res.json();
    //       recipeInfo(data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    //   getRecipe();
    // }, [id]);
    return (_jsx(_Fragment, { children: _jsx(RouterProvider, { router: router }) }));
};
export default App;
