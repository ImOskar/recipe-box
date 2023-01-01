import React, { useState } from "react";
import Button from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";

function LogInForm() {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <FormLayout handleSubmit={handleLogin}>
      <p className={styles.title}>Log in to your account</p>
      <div className={styles.box}>
        <input
          name="username"
          type="text"
          required
          value={user.username}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="username">Username</label>
      </div>
      <div className={styles.box}>
        <input
          name="password"
          type="password"
          required
          value={user.password}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="password">Password</label>
      </div>
      <Button type="submit">Log in</Button>
    </FormLayout>
  );
}

export default LogInForm;
