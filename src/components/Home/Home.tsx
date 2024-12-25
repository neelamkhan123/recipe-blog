import SearchBar from "../Navgiation/SearchBar";

import styles from "./Home.module.css";

const Home = (): JSX.Element => {
  return (
    <>
      <main className={styles["home-container"]}>
        <div className={styles.wrapper}></div>
        <h1 className={styles.title}>Find your next meal</h1>
        <SearchBar className={styles.home} width={styles.width} />
      </main>
    </>
  );
};

export default Home;
