import { Dispatch, SetStateAction, useRef, useState } from "react";
import Button from "../ui/Button";
import styles from "./RecipeImage.module.css";
import { useS3Upload } from "next-s3-upload";
import { Recipe } from "../../pages/add-recipe";

type ImageProps = {
  recipe: Recipe;
  setImage: Dispatch<SetStateAction<Recipe>>;
};

function RecipeImage({ recipe, setImage }: ImageProps) {
  const photoRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  let { uploadToS3 } = useS3Upload();

  const handleAddImage = () => {
    photoRef.current?.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const preview = URL.createObjectURL(file);
    setImage({ ...recipe, image: preview });
    uploadImageToS3(file);
  };

  const uploadImageToS3 = async (image: File) => {
    setUploading(true);
    try {
      let { url } = await uploadToS3(image);
      setImage({ ...recipe, image: url });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setImage({ ...recipe, image: "" });
      setUploading(false);
    }
  };

  return (
    <div className={styles.photobox}>
      <p>Upload image:</p>
      <input
        className={styles.fileinput}
        type="file"
        accept="image/png, image/jpeg"
        ref={photoRef}
        onChange={handleFileInput}
      ></input>
      <Button
        addStyle={["med", "lightgrey"]}
        onClick={handleAddImage}
        loading={uploading}
        type="button"
      >
        <i className="material-icons">add_a_photo</i>
      </Button>
      {recipe.image !== "" && <img src={recipe.image} alt="Upload image" />}
    </div>
  );
}

export default RecipeImage;
