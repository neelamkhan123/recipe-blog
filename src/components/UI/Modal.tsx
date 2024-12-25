import { createPortal } from "react-dom";

import styles from "./Modal.module.css";
import { Fragment } from "react";

const Backdrop = (props: any) => {
  return <div className={styles.backdrop} onClick={props.onclick}></div>;
};

const ModalOverlay = (props: any) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlay")!;

const Modal = (props: any): JSX.Element => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
