import { Dispatch, SetStateAction, useState } from "react";
import { Recipe } from "../../pages/add-recipe";
import Button from "../ui/Button";
import styles from "./../ui/FormLayout.module.css";

type ImportProps = {
  setRecipe: Dispatch<SetStateAction<Recipe>>;
};

function RecipeImport({ setRecipe }: ImportProps) {
  const [recipeUrl, setRecipeUrl] = useState({ url: "", valid: false });
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleUrlInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeUrl({ url: e.target.value, valid: e.target.checkValidity() });
  };

  const checkValue = (item: string) => {
    if (typeof item !== "undefined") return item;
    return "";
  };

  const checkArrayValue = (item: string[]) => {
    if (typeof item !== "undefined") return item;
    return [""];
  };

  const handleParse = async () => {
    if (!recipeUrl.valid) {
      setMessage({ message: "Check if url is valid", type: "error" });
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/parse-recipe?url=${recipeUrl.url}`);
    const data = await res.json();
    if (typeof data !== "undefined" && data.message === "success") {
      let parsedRecipe = data.data;
      const rec = {
        id: "0",
        title: parsedRecipe.name,
        description: checkValue(parsedRecipe.description),
        steps: parsedRecipe.recipeInstructions,
        ingredients: parsedRecipe.recipeIngredients,
        image: checkValue(parsedRecipe.image),
        url: parsedRecipe.url,
        recipeYield: checkValue(parsedRecipe.recipeYield),
        totalTime: checkValue(parsedRecipe.totalTime),
        cookTime: checkValue(parsedRecipe.cookTime),
        prepTime: checkValue(parsedRecipe.prepTime),
        keywords: checkArrayValue(parsedRecipe.keywords),
        recipeCategories: checkArrayValue(parsedRecipe.recipeCategories),
        recipeCuisines: checkArrayValue(parsedRecipe.recipeCuisines),
        userId: "",
        author: "",
      };
      setRecipe(rec);
      setMessage({
        message: "Success, review the recipe below and save.",
        type: "success",
      });
      setLoading(false);
    } else {
      setMessage({ message: "Couldn't import recipe.", type: "error" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.box}>
        <input
          className={styles.input}
          name="url"
          type="url"
          value={recipeUrl.url}
          onChange={handleUrlInput}
        ></input>
        <label>Recipe url</label>
      </div>
      <Button type="button" onClick={handleParse} loading={loading}>
        Import recipe
      </Button>
      <p className={`${styles.message} ${styles[message.type]}`}>
        {message.message}
      </p>
    </>
  );
}

export default RecipeImport;
