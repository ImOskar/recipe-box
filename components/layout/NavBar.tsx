import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./NavBar.module.css";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Logo from "../ui/Logo";
import { MdOutlineMenu, MdClose, MdSearch } from "react-icons/md";
import Button from "../ui/Button";
import RecipeSearch from "../recipes/RecipeSearch";

function NavBar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const [showShearch, setShowSearch] = useState(false);
  const clickRef = useRef<HTMLElement>(null);
  useOnClickOutside({ ref: clickRef, callback: setIsOpen });

  return (
    <header className={styles.header} ref={clickRef}>
      <div className={styles.container}>
        <Link href="/" onClick={() => setIsOpen(false)}>
          <Logo size="large" />
        </Link>
        {/* <span>
          <Button
            addStyle={"search"}
            onClick={() => setShowSearch(!showShearch)}
          >
            <MdSearch />
          </Button>
        </span> */}
        <span className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdClose /> : <MdOutlineMenu />}
        </span>
        <nav
          className={isOpen ? styles.nav : styles.navclosed}
          onClick={() => setIsOpen(false)}
        >
          <Link href="/explore">
            <span>Explore</span>
          </Link>
          {!session ? (
            <Link href="/log-in">
              <span>Sign in</span>
            </Link>
          ) : (
            <>
              <Link href="/my-recipes">
                <span>My recipes</span>
              </Link>
              <Link href="/add-recipe">
                <span>Add Recipe</span>
              </Link>
              <span
                className={styles.signout}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </span>
            </>
          )}
        </nav>
        {/* {showShearch && <RecipeSearch />} */}
      </div>
    </header>
  );
}

export default NavBar;
