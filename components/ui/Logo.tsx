import styles from "./Logo.module.css";

type LogoProps = {
  size: string;
};

function Logo({ size }: LogoProps) {
  return (
    <div className={`${styles[size]} ${styles.logo}`}>
      <i className="material-icons">restaurant_menu</i>
      <p>RECIPE BOX</p>
    </div>
  );
}

export default Logo;
