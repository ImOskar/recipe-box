import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import styles from "./Modal.module.css";

type ModalProps = {
  hideModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
};

function Modal({ hideModal, children, title }: ModalProps) {
  const ref = useRef<Element | DocumentFragment | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useOnClickOutside({ ref: modalRef, callback: hideModal });

  useEffect(() => {
    ref.current = document.querySelector("#modal");
    setMounted(true);
  }, []);

  const Modal = (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h1 className={styles.header}>{title}</h1>
        <div className={styles.buttons}>{children}</div>
      </div>
    </div>
  );

  return mounted ? createPortal(Modal, ref.current!) : null;
}
export default Modal;
