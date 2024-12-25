import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import styles from "./Explore.module.css";

type ExplorePost = {
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
  extendedIngredients: string[];
  instructions: any[];
};

const Explore = (): JSX.Element => {
  const navigate = useNavigate();

  const [explorePosts, setExplorePosts] = useState<ExplorePost[]>([]);
  const [openExplorePost, setOpenExplorePost] = useState<ExplorePost>();
  const [tag, setTag] = useState<string | undefined>("vegetarian");

  const inputRef = useRef<HTMLInputElement>(null);

  const veganTag = document.getElementById("vegan-tag");
  const vegetarianTag = document.getElementById("vegetarian-tag");
  const dessertTag = document.getElementById("dessert-tag");
  const dairyTag = document.getElementById("dairy-tag");
  const italianTag = document.getElementById("italian-tag");
  const lunchTag = document.getElementById("lunch-tag");
  const pastaTag = document.getElementById("pasta-tag");
  const ketogenicTag = document.getElementById("ketogenic-tag");
  const dinnerTag = document.getElementById("dinner-tag");

  useEffect(() => {
    const getExplorePosts = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=8d4c6012caa14184b35f48eb2e74d415&number=100&include-tags=${tag}&exclude-tags=${!tag}`
        );

        const data = await res.json();

        // console.log([data][0].recipes);
        setExplorePosts([data][0].recipes);
      } catch (err) {
        throw new Error(`${err}`);
      }
    };
    getExplorePosts();
  }, [tag]);

  useEffect(() => {
    const selectTag = (tag: HTMLElement | null) => {
      let selectedTag = tag?.textContent;
      if (selectedTag) {
        setTag(selectedTag);
      }
    };
    selectTag(veganTag);
    selectTag(vegetarianTag);
    selectTag(dessertTag);
    selectTag(dairyTag);
    selectTag(italianTag);
    selectTag(lunchTag);
    selectTag(pastaTag);
    selectTag(ketogenicTag);
    selectTag(dinnerTag);
  }, [
    veganTag,
    vegetarianTag,
    dessertTag,
    dairyTag,
    italianTag,
    lunchTag,
    pastaTag,
    ketogenicTag,
    dinnerTag,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTag(inputRef.current!.value);
  };

  const openPost = (post: ExplorePost) => {
    const selectedPost: ExplorePost = {
      id: post.id,
      title: post.title,
      image: post.image,
      servings: post.servings,
      readyInMinutes: post.readyInMinutes,
      dairyFree: post.dairyFree,
      glutenFree: post.glutenFree,
      ketogenic: post.ketogenic,
      vegan: post.vegan,
      vegetarian: post.vegetarian,
      extendedIngredients: post.extendedIngredients.map((inst: string) => inst),
      instructions: post.instructions,
    };
    setOpenExplorePost(selectedPost);

    setTimeout(() => {
      navigate("/explore-recipe");
    }, 200);
  };

  useEffect(() => {
    localStorage.setItem("explorePost", JSON.stringify(openExplorePost));
  }, [openExplorePost]);

  return (
    <main className={styles.explore}>
      <section className={styles["search-bar-container"]}>
        <div className={styles["search-bar"]}>
          <input type="text" className={styles.input} ref={inputRef} />
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles["search-button"]}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </section>

      <section className={styles["tags-container"]}>
        <ul className={styles.tags}>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="vegetarian-tag">
              vegetarian
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="vegan-tag">
              vegan
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="dessert-tag">
              dessert
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="dairy-tag">
              dairy
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="italian-tag">
              italian
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="lunch-tag">
              lunch
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="pasta-tag">
              pasta
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="ketogenic-tag">
              ketogenic
            </button>
          </li>
          <li className={styles.tag}>
            <button className={styles["tag-button"]} id="dinner-tag">
              dinner
            </button>
          </li>
        </ul>
      </section>

      <section className={styles["posts-container"]}>
        <ul className={styles.posts}>
          {explorePosts.map((post: ExplorePost) => (
            <li
              key={post.id}
              onClick={() => openPost(post)}
              className={styles.post}
            >
              <div className={styles.wrapper}>
                <h4 className={styles.title}>{post.title}</h4>
              </div>
              <img
                src={post.image}
                className={styles["post-image"]}
                alt={post.title}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Explore;
