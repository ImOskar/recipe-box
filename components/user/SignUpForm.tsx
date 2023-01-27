import router from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { User } from "../../pages/register";
import Button from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

function SignUpForm() {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "email") setValidEmail(e.target.checkValidity());
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const checkInputs = () => {
    if (user.password !== verifyPassword) {
      setMessage({ message: "Passwords don't match.", type: "error" });
      return false;
    } else if (user.password.length < 7) {
      setMessage({
        message: "Password needs to be at least 7 characters.",
        type: "error",
      });
      return false;
    } else if (!validEmail) {
      setMessage({
        message: "Make sure to enter a valid email address.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ message: "", type: "" });
    if (!checkInputs()) return;
    setLoading(true);
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
        setMessage({ message: result.message, type: "success" });
        setLoading(false);
      }
      if (result.message == "User registered") {
        let { email, password } = user;
        let options = { redirect: false, email, password };
        const res = await signIn("credentials", options);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <FormLayout handleSubmit={handleRegister}>
      <p className={styles.title}>Sign up for an account</p>
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
      <p className={`${styles.message} ${styles[message.type]}`}>
        {message.message}
      </p>
      <Button type="submit" loading={loading}>
        Register
      </Button>
      <Link href={"/log-in"}>Already have an account? Log in</Link>
    </FormLayout>
  );
}

export default SignUpForm;
