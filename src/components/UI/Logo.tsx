import { useNavigate } from "react-router";
import styles from "./Logo.module.css";

const Logo = (): JSX.Element => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <button onClick={navigateHome} className={styles.logo}>
      <i className="fa-solid fa-utensils"></i>
    </button>
  );
};

export default Logo;
