import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import styles from "./Login.module.css";

const Login = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setTimeout(() => {
        navigate(-1);
      }, 100);
    } catch (error: any) {
      const capitalizeFirstLetter = (string: string) => {
        let message = string.charAt(0).toUpperCase() + string.slice(1);
        return message;
      };
      const errorCode = error.code.replaceAll("-", " ").slice(5);
      const errorMessage = capitalizeFirstLetter(errorCode);
      setErrorMsg(errorMessage);
    }
  };

  const navigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <main className={styles.authentication}>
      <button
        onClick={navigateSignUp}
        className={`${styles["signup-header-button"]} ${styles.header}`}
      >
        Sign Up
      </button>
      <button className={`${styles["login-header-button"]} ${styles.header}`}>
        Login
      </button>
      <div className={styles["auth-container"]}>
        <form onSubmit={signIn} className={styles.form}>
          <h1 className={styles.heading}>Welcome back!</h1>
          <div className={styles["input-fields"]}>
            <label htmlFor="login-username" className={styles["sub-heading"]}>
              username
            </label>
            <input
              type="text"
              name="login-username"
              className={`${styles.input} ${styles["username-input"]}`}
              id="login-username"
              ref={emailRef}
              autoComplete="nkhan018"
            />
          </div>
          <div
            className={`${styles["input-fields"]} ${styles["password-field"]}`}
          >
            <label htmlFor="login-password" className={styles["sub-heading"]}>
              password
            </label>
            <input
              type="password"
              name="login-password"
              className={`${styles.input} ${styles["password-input"]}`}
              id="login-password"
              ref={passwordRef}
              autoComplete="123"
            />
            <p className={styles.error}>{errorMsg}</p>
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Log In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
