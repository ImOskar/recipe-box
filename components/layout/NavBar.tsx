import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./NavBar.module.css";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Logo from "../ui/Logo";
import { MdOutlineMenu, MdClose, MdSearch } from "react-icons/md";
import RecipeSearch from "../recipes/RecipeSearch";

function NavBar() {
  const { data: session } = useSession();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showShearch, setShowSearch] = useState(false);
  const clickRef = useRef<HTMLElement>(null);
  useOnClickOutside({ ref: clickRef, callback: setShowNavMenu });

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Logo size="large" />
        </Link>
        <span
          className={styles.searchbutton}
          onClick={() => setShowSearch(!showShearch)}
        >
          <MdSearch />
        </span>
        {showShearch && (
          <div className={styles.searchnav}>
            <RecipeSearch />{" "}
          </div>
        )}
        <span ref={clickRef}>
          <span
            className={styles.menu}
            onClick={() => setShowNavMenu(!showNavMenu)}
          >
            {showNavMenu ? <MdClose /> : <MdOutlineMenu />}
          </span>
          <nav
            className={showNavMenu ? styles.nav : styles.navclosed}
            onClick={() => setShowNavMenu(false)}
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
        </span>
      </div>
    </header>
  );
}

export default NavBar;
