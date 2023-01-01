import Link from "next/link";
import styles from "./NavBar.module.css";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Logo from "../ui/Logo";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const clickRef = useRef<HTMLElement>(null);
  useOnClickOutside({ ref: clickRef, callback: setIsOpen });

  const isLoggedIn = true; //placeholder for user logic

  return (
    <header className={styles.header} ref={clickRef}>
      <div className={styles.container}>
        <Link href="/">
          <Logo size="large" />
        </Link>
        <span className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="material-icons">close</i>
          ) : (
            <i className="material-icons">menu</i>
          )}
        </span>
        <nav className={isOpen ? styles.nav : styles.navclosed}>
          <Link href="/explore" onClick={() => setIsOpen(false)}>
            <span>Explore</span>
          </Link>
          {!isLoggedIn ? (
            <Link href="/log-in" onClick={() => setIsOpen(false)}>
              <span>Sign in</span>
            </Link>
          ) : (
            <>
              <Link href="/my-recipes" onClick={() => setIsOpen(false)}>
                <span>My recipes</span>
              </Link>
              <Link href="/add-recipe" onClick={() => setIsOpen(false)}>
                <span>Add Recipe</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
