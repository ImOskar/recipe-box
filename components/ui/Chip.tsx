import styles from "./Chip.module.css";

type ChipProps = {
  item: string;
  style?: string;
  selectable?: boolean;
  handleClick?: (id: string) => void;
};

function Chip({ item, style, selectable, handleClick }: ChipProps) {
  return (
    <div
      className={`${styles.chip} ${styles[style ? style : ""]} ${
        selectable && styles.selectable
      }`}
      onClick={() => handleClick && handleClick(item)}
    >
      {item}
    </div>
  );
}

export default Chip;
