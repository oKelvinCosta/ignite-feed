import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/ignite-logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" />
    </header>
  );
}
