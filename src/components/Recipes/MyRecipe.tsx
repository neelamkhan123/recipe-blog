import RecipeLayout from "./RecipeLayout";

const MyRecipe = (): JSX.Element => {
  const recipe = JSON.parse(localStorage.getItem("myPost") || "[]");

  const recipeIng = {
    ingredients: recipe.ingredients.map(
      (ing: { id: string; name: string }) => ({
        id: ing.id,
        original: ing.name,
      })
    ),
  };

  const recipeInstr = {
    instructions: recipe.instructions.map(
      (instr: { index: number; content: string }) => ({
        number: instr.index,
        step: instr.content,
      })
    ),
  };

  // return <h1>Hello</h1>;
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
      recipeIngredients={recipeIng.ingredients}
      recipeInstructions={recipeInstr.instructions}
      recipeBookmark={[recipe, recipeInstr.instructions]}
    />
  );
};

export default MyRecipe;
