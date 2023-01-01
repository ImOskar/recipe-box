import { Recipe } from "../../pages/add-recipe";
import styles from "./RecipeFilter.module.css";

type FilterProps = {
  handler: (filter: string) => void;
};

function RecipeFilter({ handler }: FilterProps) {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    handler(value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <p>Find the perfect recipe:</p>
      </div>
      {/* <div className={styles.filters}>
        <p>Breakfast</p>
        <p>Lunch</p>
        <p>Dinner</p>
      </div> */}
      <div className={styles.searchbar}>
        {/* <i className="material-icons">search</i> */}
        <input
          type="search"
          id="search"
          placeholder="Search"
          onChange={searchHandler}
        />
      </div>
    </section>
  );
}

export default RecipeFilter;
