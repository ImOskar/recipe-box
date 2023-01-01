import Image from "next/image";
import logo from "../../public/logo-white.svg";
import Logo from "../ui/Logo";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>
        <Logo size="large" />
      </span>
    </footer>
  );
}

export default Footer;
