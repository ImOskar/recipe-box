import { FormEvent, useState } from "react";
import { Recipe } from "../../pages/add-recipe/index";
import Button from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";
import RecipeImage from "./RecipeImage";

type FormProps = {
  handleAddRecipe: (data: Recipe) => void;
  edit?: boolean;
  values?: Recipe;
};

const initialValues = {
  id: "",
  title: "",
  description: "",
  image: "",
  steps: [""],
  ingredients: [""],
  cookTime: "",
  prepTime: "",
  totalTime: "",
  recipeYield: "",
  recipeCategories: [""],
  keywords: [""],
  url: "",
  userId: "",
  author: "",
};

function RecipeForm({
  handleAddRecipe,
  edit,
  values = initialValues,
}: FormProps) {
  const [recipe, setRecipe] = useState<Recipe>(values);

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
  };

  const stringToArray = (string: string) => string.split("\n");

  const checkValues = (value: string | string[] | undefined) => {
    if (typeof value !== "undefined" && Array.isArray(value))
      return value.join("\r\n");
    if (typeof value !== "undefined") return value;
    return "";
  };

  return (
    <FormLayout handleSubmit={handleSubmit}>
      <p className={styles.title}>
        {edit ? "Edit your recipe" : "Add new recipe"}
      </p>
      <p className={styles.subtitle}>Recipe information (required):</p>
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
          rows={15}
        />
        <label>Instructions</label>
      </div>
      <p className={styles.subtitle}>Recipe details (optional):</p>
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

      {/* <div className={styles.box}>
        recipeCategories?: string[]; keywords?: string[]; url?: string; author?:
        string;
      </div> */}
      <div>
        <Button type="submit">Save Recipe</Button>
      </div>
    </FormLayout>
  );
}

export default RecipeForm;
