import { ReactNode } from "react";
import styles from "./Button.module.css";
import Spinner from "./Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  addStyle?: string | string[];
  loading?: boolean;
};

function Button({ children, addStyle, loading, ...rest }: ButtonProps) {
  const addStyles = () => {
    if (typeof addStyle !== "undefined") {
      if (Array.isArray(addStyle)) {
        const styleArray = addStyle.map((item) => styles[item]);
        return styleArray.join(" ");
      }
      return [styles[addStyle]];
    }
    return "";
  };

  return (
    <button
      className={`${styles.button} ${addStyles()} loading`}
      disabled={loading}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && children}
    </button>
  );
}

export default Button;
