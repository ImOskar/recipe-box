import { FormEvent, useState } from "react";
import { Recipe } from "../../pages/add-recipe/index";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";
import RecipeImage from "./RecipeImage";
import RecipeImport from "./RecipeImport";
import { INITIAL_FORM_VALUES, RECIPE_CATEGORIES } from "../../lib/constants";

type FormProps = {
  handleAddRecipe: (data: Recipe) => void;
  save: boolean;
  edit?: boolean;
  values?: Recipe;
};

function RecipeForm({
  handleAddRecipe,
  save,
  edit,
  values = INITIAL_FORM_VALUES,
}: FormProps) {
  const [recipe, setRecipe] = useState<Recipe>(values);
  const [categories] = useState(RECIPE_CATEGORIES);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "ingredients" || name === "steps")
      setRecipe({ ...recipe, [name]: stringToArray(value) });
    else setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    handleAddRecipe(recipe);
    setRecipe(INITIAL_FORM_VALUES);
  };

  const stringToArray = (string: string) => string.split("\n");

  const handleSelectCategory = (categoryName: string) => {
    let categories: string[] = [];
    if (typeof recipe.recipeCategories !== "undefined")
      categories = recipe.recipeCategories as string[];
    if (categories.includes(categoryName))
      setRecipe({
        ...recipe,
        recipeCategories: categories.filter((cat) => cat !== categoryName),
      });
    else if (categories.length === 1 && categories[0] === "")
      setRecipe({ ...recipe, recipeCategories: [categoryName] });
    else {
      setRecipe({ ...recipe, recipeCategories: [...categories, categoryName] });
    }
  };

  return (
    <FormLayout handleSubmit={handleSubmit}>
      <p className={styles.title}>
        {edit ? "Edit your recipe" : "Add new recipe"}
      </p>
      {!edit && <RecipeImport setRecipe={setRecipe} />}
      <p className={styles.subtitle}>recipe</p>
      <div className={styles.sectiontitle}>
        <p>Recipe information (required):</p>
        <div className={styles.seperator}></div>
      </div>
      <div className={styles.box}>
        <input
          className={styles.input}
          name="title"
          type="text"
          onChange={handleChange}
          value={recipe.title}
          required
        />
        <label>Title</label>
      </div>
      <div className={styles.box}>
        <textarea
          className={styles.input}
          name="ingredients"
          onChange={handleChange}
          value={recipe.ingredients.join("\r\n")}
          placeholder={[
            "For example:",
            "500gr flour",
            "2 cups sugar",
            "etc.",
          ].join("\r\n")}
          rows={15}
          required
        />
        <label>Ingredients</label>
      </div>
      <div className={styles.box}>
        <textarea
          className={styles.input}
          name="steps"
          onChange={handleChange}
          value={recipe.steps.join("\r\n")}
          placeholder={[
            "Find ingredients",
            "Mix ingredients",
            "Cook",
            "Eat",
          ].join("\r\n")}
          rows={15}
          required
        />
        <label>Instructions</label>
      </div>
      <div className={styles.sectiontitle}>
        <p>Recipe details (optional):</p>
        <div className={styles.seperator}></div>
      </div>
      <RecipeImage recipe={recipe} setImage={setRecipe} />
      <div className={styles.box}>
        <input
          className={styles.input}
          name="description"
          type="text"
          onChange={handleChange}
          value={recipe.description}
        />
        <label>Description</label>
      </div>
      <div className={styles.smallboxes}>
        <div className={styles.box}>
          <input
            className={styles.input}
            name="cookTime"
            type="text"
            onChange={handleChange}
            value={recipe.cookTime}
            placeholder="45 mins"
          />
          <label>Cook time</label>
        </div>
        <div className={styles.box}>
          <input
            className={styles.input}
            name="prepTime"
            type="text"
            onChange={handleChange}
            value={recipe.prepTime}
            placeholder="15 mins"
          />
          <label>Prep time</label>
        </div>
        <div className={styles.box}>
          <input
            className={styles.input}
            name="totalTime"
            type="text"
            onChange={handleChange}
            value={recipe.totalTime}
            placeholder="60 mins"
          />
          <label>Total time</label>
        </div>
        <div className={styles.box}>
          <input
            className={styles.input}
            name="recipeYield"
            type="text"
            onChange={handleChange}
            value={recipe.recipeYield}
            placeholder="6 servings"
          />
          <label>Yield</label>
        </div>
      </div>
      <div className={styles.box}>
        <input
          className={styles.input}
          name="author"
          type="text"
          onChange={handleChange}
          value={recipe.author}
        />
        <label>Author</label>
      </div>
      <div className={styles.box}>
        <input
          className={styles.input}
          name="url"
          type="text"
          onChange={handleChange}
          value={recipe.url}
        />
        <label>Recipe url</label>
      </div>
      <div className={styles.sectiontitle}>
        <p>Select categories:</p>
        <div className={styles.seperator}></div>
      </div>
      <div className={styles.tagbox}>
        {categories.map((category) => {
          return (
            <Tag
              key={category}
              item={category}
              selectable
              style={
                recipe.recipeCategories?.some(
                  (cat) => cat.toLowerCase() === category.toLowerCase()
                )
                  ? "selected"
                  : ""
              }
              handleClick={() => handleSelectCategory(category)}
            />
          );
        })}
      </div>
      <div className={styles.seperator}></div>
      {/* <div className={styles.box}>
        recipeCuisines; keywords?: string[];
      </div> */}
      <Button type="submit" loading={save}>
        Save Recipe
      </Button>
    </FormLayout>
  );
}

export default RecipeForm;
