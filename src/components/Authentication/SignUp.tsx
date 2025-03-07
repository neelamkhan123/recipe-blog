import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import styles from "./SignUp.module.css";

const SignUp = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const createAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setTimeout(() => {
        navigate("/login");
      }, 10);
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

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <main className={styles.authentication}>
      <div className={styles.wrapper}>
        <button
          className={`${styles["signup-header-button"]} ${styles.header}`}
        >
          Sign Up
        </button>
        <button
          onClick={navigateLogin}
          className={`${styles["login-header-button"]} ${styles.header}`}
        >
          Login
        </button>
      </div>
      <div className={styles["auth-container"]}>
        <form className={styles.form} onSubmit={createAccount}>
          <h1 className={styles.heading}>Become apart of our community</h1>
          <div className={styles["input-fields"]}>
            <label htmlFor="signup-username" className={styles["sub-heading"]}>
              username
            </label>
            <input
              type="email"
              name="signup-username"
              className={`${styles.input} ${styles["username-input"]}`}
              ref={emailRef}
              id="signup-username"
              autoComplete="nkhan018"
            />
          </div>
          <div
            className={`${styles["input-fields"]} ${styles["password-field"]}`}
          >
            <label htmlFor="signup-password" className={styles["sub-heading"]}>
              password
            </label>
            <input
              type="password"
              name="signup-password"
              className={`${styles.input} ${styles["password-input"]}`}
              ref={passwordRef}
              id="signup-password"
              autoComplete="123"
            />
            <p className={styles.error}>{errorMsg}</p>
          </div>

          <button type="submit" className={styles["submit-button"]}>
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
