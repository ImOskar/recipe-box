import { FormEvent, useState } from "react";
import { Recipe } from "../../pages/add-recipe/index";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import FormLayout from "../ui/FormLayout";
import styles from "./../ui/FormLayout.module.css";
import RecipeImage from "./RecipeImage";
import RecipeImport from "./RecipeImport";

type FormProps = {
  handleAddRecipe: (data: Recipe) => void;
  save: boolean;
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
  save,
  edit,
  values = initialValues,
}: FormProps) {
  const [recipe, setRecipe] = useState<Recipe>(values);
  const [categories, setCategories] = useState([
    "Baking",
    "Breakfast",
    "Brunch",
    "Dessert",
    "Dinner",
    "Drinks",
    "Lunch",
    "Snack",
  ]);
  const [selectedCategories, setSelectedCategories] = useState(
    recipe.recipeCategories!
  );

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
    setRecipe({ ...recipe, recipeCategories: selectedCategories });
    handleAddRecipe(recipe);
  };

  const stringToArray = (string: string) => string.split("\n");

  const handleSelectCategory = (name: string) => {
    if (selectedCategories.includes(name))
      setSelectedCategories(selectedCategories.filter((cat) => cat !== name));
    else if (selectedCategories.length === 1 && selectedCategories[0] === "")
      setSelectedCategories([name]);
    else setSelectedCategories([...selectedCategories, name]);
  };

  return (
    <FormLayout handleSubmit={handleSubmit}>
      <p className={styles.title}>
        {edit ? "Edit your recipe" : "Add new recipe"}
      </p>
      {!edit && <RecipeImport setRecipe={setRecipe} />}
      <p className={styles.subtitle}>Add recipe</p>
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
            "Bake",
            "Eat",
          ].join("\r\n")}
          rows={15}
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
      <div className={styles.chipbox}>
        {categories.map((category) => {
          return (
            <Chip
              key={category}
              item={category}
              selectable
              style={selectedCategories.includes(category) ? "selected" : ""}
              handleClick={handleSelectCategory}
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
