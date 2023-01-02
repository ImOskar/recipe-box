import { FormEvent, useEffect, useState } from "react";
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
  id: 0,
  title: "",
  description: "",
  image: "",
  steps: [""],
  ingredients: [""],
};

function RecipeForm({
  handleAddRecipe,
  edit,
  values = initialValues,
}: FormProps) {
  const [image, setImage] = useState("");
  const [recipe, setRecipe] = useState<Recipe>(values);

  useEffect(() => {
    if (typeof recipe.image !== "undefined") setImage(recipe.image);
  }, []);

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

    const recipeData = {
      id: edit ? values?.id! : Math.random() * 10,
      title: recipe.title,
      description: recipe.description,
      image: image,
      steps: recipe.steps,
      ingredients: recipe.ingredients,
    };

    handleAddRecipe(recipeData);
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
      <p className={styles.title}>{"Add new recipe"}</p>
      <RecipeImage image={image} setImage={setImage} />
      <div className={styles.box}>
        <input
          className={styles.input}
          name="title"
          type="text"
          onChange={handleChange}
          defaultValue={checkValues(values?.title)}
          required
        />
        <label>Title</label>
      </div>
      <div className={styles.box}>
        <input
          className={styles.input}
          name="description"
          type="text"
          onChange={handleChange}
          defaultValue={checkValues(values?.description)}
          required
        />
        <label>Description</label>
      </div>
      <div className={styles.box}>
        <textarea
          className={styles.input}
          name="ingredients"
          onChange={handleChange}
          defaultValue={edit ? checkValues(values?.ingredients) : ""}
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
          defaultValue={edit ? checkValues(values?.steps) : ""}
          rows={15}
        />
        <label>Instructions</label>
      </div>
      <div>
        <Button type="submit">Save Recipe</Button>
      </div>
    </FormLayout>
  );
}

export default RecipeForm;
