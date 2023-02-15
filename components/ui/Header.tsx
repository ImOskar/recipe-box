import { ReactNode } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
  return <p className={styles.header}>{children}</p>;
}

export default Header;
