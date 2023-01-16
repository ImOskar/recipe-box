import styles from "./Spinner.module.css";

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
      <i className="material-icons">restaurant_menu</i>
    </div>
  );
}

export default Spinner;
