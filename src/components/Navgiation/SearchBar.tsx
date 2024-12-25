import { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import styles from "./SearchBar.module.css";

interface Item {
  id: number;
  title: string;
}

interface Recipe {
  userId: string | null | undefined;
  readonly id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  dairyFree: boolean;
  glutenFree: boolean;
  ketogenic: boolean;
  vegan: boolean;
  vegetarian: boolean;
  extendedIngredients: {
    original: string;
    id: string;
  }[];
}

interface Instructions {
  steps: {
    number: number;
    step: string;
  }[];
}

interface SearchBarProps {
  className: string;
  width: string;
}

const SearchBar = ({ className, width }: SearchBarProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<Item[]>([]);
  const [showList, setShowList] = useState(false);
  const [id, setId] = useState<number | null>();

  const navigate = useNavigate();

  const user = auth.currentUser;

  const recipeInfo = (info: Recipe) => {
    const recipe: Recipe[] = [];

    const recipeData: Recipe = {
      userId: user?.email,
      id: info.id,
      title: info.title,
      image: info.image,
      servings: info.servings,
      readyInMinutes: info.readyInMinutes,
      dairyFree: info.dairyFree,
      glutenFree: info.glutenFree,
      ketogenic: info.ketogenic,
      vegan: info.vegan,
      vegetarian: info.vegetarian,
      extendedIngredients: info.extendedIngredients.map((ing) => ({
        original: ing.original,
        id: uniqid(),
      })),
    };
    recipe.push(recipeData);
    localStorage.setItem("recipe", JSON.stringify(recipe));
  };

  const recipeSteps = (instruct: Instructions) => {
    const recipeInstructions: Instructions[] = [];

    const recSteps: Instructions = {
      steps: instruct.steps.map((inst) => ({
        number: inst.number,
        step: inst.step,
      })),
    };
    recipeInstructions.push(recSteps);
    localStorage.setItem(
      "recipeInstructions",
      JSON.stringify(recipeInstructions)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputRef.current!.value);
    setShowList(true);
  };

  const selectResultHandler = (id: number) => {
    setId(id);
    inputRef.current!.value = "";
    setTimeout(() => {
      navigate("/recipe");
      window.location.reload();
    }, 200);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=8d4c6012caa14184b35f48eb2e74d415&instructionsRequired=true&query=${query}`
        );
        const data = await res.json();
        const { results } = data;
        setQueryResults(results);
      } catch (err) {
        console.error(err);
      }
    };
    getPosts();
  }, [query, recipeInfo]);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      const getRecipe = async () => {
        try {
          const res = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=8d4c6012caa14184b35f48eb2e74d415&includeNutrition=false`
          );
          const data = await res.json();
          recipeInfo(data);
        } catch (err) {
          console.error(err);
        }
      };
      getRecipe();
    }
  }, [id, recipeInfo]);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      const getInstructions = async () => {
        try {
          const res = await fetch(
            `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=8d4c6012caa14184b35f48eb2e74d415`
          );
          const data = await res.json();
          recipeSteps(data[0]);
        } catch (err) {
          console.error(err);
        }
      };
      getInstructions();
    }
  }, [id, recipeInfo]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className ? className : ""}`}
    >
      <div className={`${styles["search-bar"]} ${width ? width : ""}`}>
        <input
          placeholder="pasta"
          id="input"
          name="input"
          type="text"
          className={styles["input-field"]}
          ref={inputRef}
          onChange={() => setShowList(false)}
        />
        <button type="submit" className={styles["search-btn"]}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {showList && (
        <ul
          className={styles["search-list"]}
          onMouseLeave={() => setShowList(false)}
        >
          {queryResults.length === 0 ? (
            <p className={styles.error}>No results found.</p>
          ) : (
            queryResults.map((result) => (
              <li key={result.id} className={styles["list-item"]}>
                <button
                  className={styles.select}
                  onMouseEnter={() => setShowList(true)}
                  onClick={() => selectResultHandler(result.id)}
                >
                  {result.title}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
