import styles from "./Spinner.module.css";
import { MdRestaurantMenu } from "react-icons/md";

type SpinnerProps = {
  style?: string;
};

function Spinner({ style }: SpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${
        styles[typeof style !== "undefined" ? style : ""]
      }`}
    >
      <MdRestaurantMenu />
    </div>
  );
}

export default Spinner;
