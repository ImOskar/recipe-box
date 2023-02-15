import styles from "./Tag.module.css";

type TagProps = {
  item: string;
  style?: string;
  selectable?: boolean;
  handleClick?: (id: string) => void;
};

function Tag({ item, style, selectable, handleClick }: TagProps) {
  return (
    <div
      className={`${styles.tag} ${styles[style ? style : ""]} ${
        selectable && styles.selectable
      }`}
      onClick={() => handleClick && handleClick(item)}
    >
      {item}
    </div>
  );
}

export default Tag;
