import styles from "./Logo.module.css";
import { MdRestaurantMenu } from "react-icons/md";

type LogoProps = {
  size: string;
};

function Logo({ size }: LogoProps) {
  return (
    <div className={`${styles[size]} ${styles.logo}`}>
      <MdRestaurantMenu />
      <p>RECIPE BOX</p>
    </div>
  );
}

export default Logo;
