import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import photo from "../../images/display-picture.jpg";

import styles from "./MyAccount.module.css";
import SuccessModal from "../UI/SuccessModal";

type MyPost = {
  readonly id: string;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  dairyFree: boolean;
  glutenFree: boolean;
  ketogenic: boolean;
  vegan: boolean;
  vegetarian: boolean;
  ingredients: {
    id: string;
    name: string;
  }[];
  instructions: {
    index: number;
    content: string;
  }[];
};

const MyAccount = (): JSX.Element => {
  const [successModal, setSuccessModal] = useState(false);
  const [openMyPost, setOpenMyPost] = useState<MyPost>();

  const user = auth!.currentUser;

  const navigate = useNavigate();

  // Get Post Data
  let posts = JSON.parse(localStorage.getItem("postData") || "[]");

  posts = posts.filter((post: any) => post.userId === user?.email);

  // Edit Post
  const editHandler = (id: string) => {};

  // Delete Post
  const deleteHandler = (id: string) => {
    const index = posts.findIndex((post: { id: string }) => post.id === id);

    posts.splice(index, 1);
    posts.filter((post: { id: string }) => post.id !== id);

    localStorage.setItem("postData", JSON.stringify(posts));

    // Success Modal
    setSuccessModal(true);

    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
  };

  // Open Post
  const openPost = (post: MyPost) => {
    const selectedPost: MyPost = {
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
      ingredients: post.ingredients.map(
        (ing: { id: string; name: string }) => ing
      ),
      instructions: post.instructions.map(
        (inst: { index: number; content: string }) => inst
      ),
    };
    setOpenMyPost(selectedPost);

    setTimeout(() => {
      navigate("/my-recipe-page");
    }, 200);
  };

  useEffect(() => {
    localStorage.setItem("myPost", JSON.stringify(openMyPost));
  }, [openMyPost]);

  return (
    <main className={styles["my-account"]}>
      <section className={styles["top-container"]}>
        <img className={styles.image} src={photo} alt="Food" />
        <div className={styles["user-info"]}>
          <h1 className={styles["display-name"]}>Neelam Khan</h1>
          <h3 className={styles.email}>{user?.email}</h3>
        </div>
      </section>
      <section className={styles["bottom-container"]}>
        <ul className={styles.posts}>
          {posts.length === 0 ? (
            <h3 className={styles["default-text"]}>
              View posts here after you add some!
            </h3>
          ) : (
            posts.map((post: MyPost, index: number) => (
              <li
                key={index}
                className={styles.post}
                onClick={() => openPost(post)}
              >
                <div className={styles.wrapper}>
                  <h4 className={styles.title}>{post.title}</h4>
                  <div className={styles.buttons}>
                    <button
                      onClick={() => deleteHandler(post.id)}
                      className={styles.button}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <button
                      onClick={() => editHandler(post.id)}
                      className={styles.button}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                </div>
                <img
                  src={post.image}
                  className={styles["post-image"]}
                  alt="Food"
                />
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Success Modal */}
      {successModal && (
        <SuccessModal status={true} message={"Successfully deleted."} />
      )}
    </main>
  );
};

export default MyAccount;
