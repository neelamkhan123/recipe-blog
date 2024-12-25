import RecipeLayout from "./RecipeLayout";

const ExploreRecipe = (): JSX.Element => {
  const recipe = JSON.parse(localStorage.getItem("explorePost") || "[]");

  const instructionsArr = recipe.instructions
    .split(".")
    .map((step: string) =>
      step
        .split("\n")
        .join("")
        .replaceAll("<ol>", "")
        .replaceAll("</ol>", "")
        .replaceAll("<li>", "")
        .replaceAll("</li>", "")
    )
    .filter((step: string) => step.length !== 0);

  const recipeInstructions = {
    steps: instructionsArr.map((inst: string, index: number) => ({
      number: index + 1,
      step: inst,
    })),
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
      recipeInstructions={recipeInstructions.steps}
      recipeBookmark={[recipe, recipeInstructions.steps]}
    />
  );
};

export default ExploreRecipe;
