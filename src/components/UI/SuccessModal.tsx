import styles from "./Success.module.css";

type SuccessModalType = {
  message: string;
  status: boolean;
};

const SuccessModal = ({ message, status }: SuccessModalType): JSX.Element => {
  return (
    <h4
      style={
        status
          ? { backgroundColor: "red" }
          : { backgroundColor: "rgb(74, 207, 47)" }
      }
      className={styles.text}
    >
      {message}
    </h4>
  );
};

export default SuccessModal;
