import { Dispatch, SetStateAction, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Button from "./Button";
import styles from "./Modal.module.css";

type ModalProps = {
  deleteHandler: () => Promise<void>;
  hideModal: Dispatch<SetStateAction<boolean>>;
};

function Modal({ deleteHandler, hideModal }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({ ref: modalRef, callback: hideModal });

  return (
    <div className={styles.modalwrapper} ref={modalRef}>
      <h1 className={styles.header}>
        Are you sure you want to delete this recipe?
      </h1>
      <div className={styles.buttons}>
        <Button addStyle={"med"} onClick={() => hideModal(false)}>
          Cancel
        </Button>
        <Button addStyle={["med", "alert"]} onClick={deleteHandler}>
          Delete
        </Button>
      </div>
    </div>
  );
}
export default Modal;
