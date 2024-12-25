import RecipeLayout from "./RecipeLayout";

const SearchedRecipe = () => {
  const recipeStorage = JSON.parse(localStorage.getItem("recipe") || "[]");

  const recipeInstructionsStorage = JSON.parse(
    localStorage.getItem("recipeInstructions") || "[]"
  );

  const recipe = {
    userId: recipeStorage[0].userId,
    id: recipeStorage[0].id,
    title: recipeStorage[0].title,
    image: recipeStorage[0].image,
    servings: recipeStorage[0].servings,
    readyInMinutes: recipeStorage[0].readyInMinutes,
    dairyFree: recipeStorage[0].dairyFree,
    glutenFree: recipeStorage[0].glutenFree,
    ketogenic: recipeStorage[0].ketogenic,
    vegan: recipeStorage[0].vegan,
    vegetarian: recipeStorage[0].vegetarian,
    extendedIngredients: recipeStorage[0].extendedIngredients.map(
      (ing: { original: string; id: string }) => ({
        original: ing.original,
        id: ing.id,
      })
    ),
    steps: recipeInstructionsStorage[0].steps.map(
      (inst: { number: number; step: string }) => ({
        number: inst.number,
        step: inst.step.replace(".", ". "),
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

export default SearchedRecipe;
