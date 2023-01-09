import router from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { User } from "../../pages/register";
import Button from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";

function SignUpForm() {
  const [message, setMessage] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (user.password !== verifyPassword) {
      setMessage("Passwords don't match");
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      if (result.message) {
        setMessage(result.message);
      }
      if (result.message == "success") {
        let { email, password } = user;
        let options = { redirect: false, email, password };
        const res = await signIn("credentials", options);
        console.log("SIGNIN SIGNUPPAGE: " + res);
        router.push("/");
      }
    } catch (error) {}
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
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <label>Verify password</label>
      </div>
      <p className={styles.message}>{message}</p>
      <Button type="submit">Register</Button>
    </FormLayout>
  );
}

export default SignUpForm;
