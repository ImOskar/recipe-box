import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";
import Router from "next/router";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

function LogInForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });
    if (status?.ok) {
      setLoading(false);
      Router.push("/");
    } else if (typeof status?.error !== "undefined") {
      setLoading(false);
      setMessage(status?.error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <FormLayout handleSubmit={handleLogin}>
      <p className={styles.title}>Log in to your account</p>
      <Button
        addStyle={"google"}
        type="button"
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Continue with Google
        <FcGoogle />
      </Button>
      <div className={styles.box}>
        <input
          name="email"
          type="email"
          required
          value={user.email}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className={styles.box}>
        <input
          name="password"
          type="password"
          required
          value={user.password}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
      </div>
      <p className={styles.message}>{message}</p>
      <Button type="submit" loading={loading}>
        Log in
      </Button>
      <Link href={"/register"}>Don&apos;t have an account? Sign up</Link>
    </FormLayout>
  );
}

export default LogInForm;
