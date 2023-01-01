import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
