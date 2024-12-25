import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import SearchBar from "./SearchBar";
import Logo from "../UI/Logo";

import styles from "./MainNavigation.module.css";

const MainNavigation = (): JSX.Element => {
  const [showUserAccess, setShowUserAccess] = useState(Boolean);
  const [noUserAccess, setNoUserAccess] = useState(Boolean);
  const [showUserNav, setShowUserNav] = useState(Boolean);
  const [showNavSearchBar, setShowNavSearchBar] = useState(Boolean);

  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowUserAccess(true);
        setNoUserAccess(false);
      } else {
        setNoUserAccess(true);
        setShowUserAccess(false);
      }
    });
  }, []);

  const signOutAccount = async () => {
    try {
      await signOut(auth);
      setShowUserAccess(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setShowNavSearchBar(false);
    } else {
      setShowNavSearchBar(true);
    }
  }, [location.pathname]);

  return (
    <nav className={styles.navigation}>
      <div className={styles["nav-container"]}>
        {noUserAccess && (
          <main className={styles.main}>
            <Logo />
            {showNavSearchBar && (
              <SearchBar width={styles.width} className={styles.navbar} />
            )}
            <NavLink to="/login" className={styles["auth-icon"]}>
              <i className="fa-regular fa-user"></i>
            </NavLink>
          </main>
        )}
        {showUserAccess && (
          <main className={styles.main}>
            <Logo />
            {showNavSearchBar && (
              <SearchBar width={styles.width} className={styles.navbar} />
            )}
            <div className={styles["user-active"]}>
              <div className={styles["nav-router"]}>
                <NavLink to="/explore" className={styles["auth-icon"]}>
                  <i className="fa-solid fa-hashtag"></i>
                </NavLink>

                <NavLink to="/post-form" className={styles["auth-icon"]}>
                  <i className="fa-solid fa-plus"></i>
                </NavLink>

                <NavLink
                  onMouseEnter={() => setShowUserNav(true)}
                  to="/login"
                  className={styles["auth-icon"]}
                >
                  <i className="fa-regular fa-user"></i>
                </NavLink>
              </div>

              {showUserNav && (
                <ul
                  onMouseLeave={() => setShowUserNav(false)}
                  className={styles["navbar-list"]}
                >
                  <li className={styles["navbar-list-item"]}>
                    {auth.currentUser?.email}
                  </li>

                  <li className={styles["navbar-list-item"]}>
                    <NavLink className={styles.link} to="/my-account">
                      my account
                    </NavLink>
                  </li>
                  <li className={styles["navbar-list-item"]}>
                    <NavLink className={styles.link} to="/bookmarks">
                      my bookmarks
                    </NavLink>
                  </li>
                  <li
                    onClick={signOutAccount}
                    className={styles["navbar-list-item"]}
                  >
                    <NavLink className={styles.button} to="/login">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </main>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
