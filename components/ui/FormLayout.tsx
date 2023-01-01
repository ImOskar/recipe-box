import React from "react";
import styles from "./FormLayout.module.css";

type FormProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent) => void;
};

function FormLayout({ children, handleSubmit }: FormProps) {
  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default FormLayout;
