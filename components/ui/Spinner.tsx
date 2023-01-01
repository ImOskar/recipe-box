import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinner}>
      <i className="material-icons">restaurant_menu</i>
    </div>
  );
}

export default Spinner;
