import { useNavigate } from "react-router";
import { auth } from "../../firebase";

import styles from "./Bookmarks.module.css";

const Bookmarks = (): JSX.Element => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  const bookmarksStorage = bookmarks.filter(
    (bookmark: any) => bookmark.userId === auth.currentUser?.email
  );

  const navigate = useNavigate();

  const navigateBookmarkDetails = (details: {}) => {
    localStorage.setItem("bookmarkDetails", JSON.stringify(details));

    navigate("/bookmarked-recipe");
  };

  const deleteBookmark = (bookmarkId: number) => {
    const bookmarkIndex = bookmarksStorage.findIndex(
      (item: any) => item.id === bookmarkId
    );
    bookmarksStorage.splice(bookmarkIndex, 1);

    navigate("/bookmarks");

    localStorage.setItem("bookmarks", JSON.stringify(bookmarksStorage));
  };

  return (
    <main className={styles.bookmarks}>
      <div className={styles["bookmarks-container"]}>
        <h1 className={styles.heading}>
          {bookmarksStorage.length === 0
            ? "save some recipes for later 🥣"
            : "my bookmarks"}
        </h1>
        <ul className={styles["bookmarks-list"]}>
          {bookmarksStorage.map(
            (bookmark: {
              title: string;
              id: number;
              userId: string;
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
              steps: {
                number: number;
                step: string;
              }[];
            }) => (
              <li className={styles["bookmarks-list-item"]} key={bookmark.id}>
                <div
                  className={styles["image-container"]}
                  onClick={() => navigateBookmarkDetails(bookmark)}
                >
                  <div className={styles["image-wrapper"]}></div>
                  <img src={bookmark.image} className={styles.image} alt="" />
                </div>
                <div className={styles.label}>
                  <h3
                    onClick={() => navigateBookmarkDetails(bookmark)}
                    className={styles.title}
                  >
                    {bookmark.title}
                  </h3>
                  <div
                    onClick={() => deleteBookmark(bookmark.id)}
                    className={styles.icon}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </main>
  );
};

export default Bookmarks;
