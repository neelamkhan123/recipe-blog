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

// const Home = (): JSX.Element => {
//   return (
//     <h1
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       Testing Homepage
//     </h1>
//   );
// };

export default Home;
