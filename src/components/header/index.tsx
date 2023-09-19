import React from "react";
import styles from "./index.module.scss";
// import { Logo } from 'assets/icons/logo';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <Logo />/ */}
      <a role="button" className={styles.hamburger}>
        <button></button>
        <button></button>
      </a>
    </header>
  );
};

export default Header;
