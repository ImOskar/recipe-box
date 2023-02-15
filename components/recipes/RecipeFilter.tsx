import { useRouter } from "next/router";
import styles from "./RecipeFilter.module.css";
import { RECIPE_CATEGORIES } from "../../lib/constants";
import Tag from "../ui/Tag";

type FilterProps = {
  selectedCategory: string;
  userFilter?: boolean;
};

function RecipeFilter({ selectedCategory, userFilter }: FilterProps) {
  const router = useRouter();

  const handleFilter = (category: string) => {
    let url;
    if (userFilter) url = `/my-recipes/${category}`;
    else url = `/explore/${category}`;
    router.push(url);
  };

  return (
    <div className={styles.filter}>
      <Tag
        item="All recipes"
        style={selectedCategory.toLowerCase() === "all" ? "selected" : ""}
        selectable
        handleClick={() => handleFilter("All")}
      />
      {userFilter && (
        <Tag
          item="Liked"
          style={selectedCategory.toLowerCase() === "liked" ? "selected" : ""}
          selectable
          handleClick={() => handleFilter("Liked")}
        />
      )}
      {RECIPE_CATEGORIES.map((cat) => {
        return (
          <Tag
            key={cat}
            item={cat}
            style={
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? "selected"
                : ""
            }
            selectable
            handleClick={() => handleFilter(cat)}
          />
        );
      })}
    </div>
  );
}

export default RecipeFilter;
