import React, { useState } from "react";
import Button from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";

function SignUpForm() {
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== user.verifyPassword) {
      setError(true);
      return;
    }
    console.log(user);
  };

  return (
    <FormLayout handleSubmit={handleRegister}>
      <p className={styles.title}>Sign up for an account</p>
      <div className={styles.box}>
        <input
          name="email"
          type="email"
          required
          value={user.email}
          onChange={handleInputChange}
        />
        <label>Email</label>
      </div>
      <div className={styles.box}>
        <input
          name="username"
          type="text"
          required
          value={user.username}
          onChange={handleInputChange}
        />
        <label>Username</label>
      </div>
      <div className={styles.box}>
        <input
          name="password"
          type="password"
          required
          value={user.password}
          onChange={handleInputChange}
        />
        <label>Password</label>
      </div>
      <div className={styles.box}>
        <input
          name="verifyPassword"
          type="password"
          required
          value={user.verifyPassword}
          onChange={handleInputChange}
        />
        <label>Verify password</label>
      </div>
      {error && <p className={styles.error}>Password does not match</p>}
      <Button type="submit">Register</Button>
    </FormLayout>
  );
}

export default SignUpForm;
