import RecipeLayout from "../Recipes/RecipeLayout";

const BookmarkedRecipe = (): JSX.Element => {
  const bookmarkedRecipeStorage = JSON.parse(
    localStorage.getItem("bookmarkDetails") || "[]"
  );

  const recipe = {
    userId: bookmarkedRecipeStorage.userId,
    id: bookmarkedRecipeStorage.id,
    title: bookmarkedRecipeStorage.title,
    image: bookmarkedRecipeStorage.image,
    servings: bookmarkedRecipeStorage.servings,
    readyInMinutes: bookmarkedRecipeStorage.readyInMinutes,
    dairyFree: bookmarkedRecipeStorage.dairyFree,
    glutenFree: bookmarkedRecipeStorage.glutenFree,
    ketogenic: bookmarkedRecipeStorage.ketogenic,
    vegan: bookmarkedRecipeStorage.vegan,
    vegetarian: bookmarkedRecipeStorage.vegetarian,
    extendedIngredients: bookmarkedRecipeStorage.extendedIngredients.map(
      (ing: { original: string; id: string }) => ({
        original: ing.original,
        id: ing.id,
      })
    ),
    steps: bookmarkedRecipeStorage.steps.map(
      (inst: { number: number; step: string }) => ({
        number: inst.number,
        step: inst.step,
      })
    ),
  };

  return (
    <RecipeLayout
      userId={recipe.userId}
      recipeId={recipe.id}
      recipeTitle={recipe.title}
      recipeImage={recipe.image}
      recipeServings={recipe.servings}
      recipeDuration={recipe.readyInMinutes}
      recipeDairyFree={recipe.dairyFree}
      recipeGlutenFree={recipe.glutenFree}
      recipeKetogenic={recipe.ketogenic}
      recipeVegan={recipe.vegan}
      recipeVegetarian={recipe.vegetarian}
      recipeIngredients={recipe.extendedIngredients}
      recipeInstructions={recipe.steps}
      recipeBookmark={recipe}
    />
  );
};

export default BookmarkedRecipe;
