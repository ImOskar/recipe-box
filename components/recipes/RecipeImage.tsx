import { Dispatch, SetStateAction, useState } from "react";
import styles from "./RecipeImage.module.css";
import { useS3Upload } from "next-s3-upload";
import { Recipe } from "../../pages/add-recipe";
import Spinner from "../ui/Spinner";
import { MdAddAPhoto } from "react-icons/md";

type ImageProps = {
  recipe: Recipe;
  setImage: Dispatch<SetStateAction<Recipe>>;
};

function RecipeImage({ recipe, setImage }: ImageProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  let { uploadToS3 } = useS3Upload();

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
      setMessage("Image uploaded");
      setUploading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      setImage({ ...recipe, image: "" });
      setMessage("Upload failed");
      setUploading(false);
    }
  };

  return (
    <div className={styles.photobox}>
      <label className={styles.labelbtn} htmlFor="file">
        Upload image
        <MdAddAPhoto />
        <input
          className={styles.fileinput}
          id="file"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileInput}
        ></input>
      </label>
      {recipe.image && <img src={recipe.image} alt="Upload image" />}
      {uploading && <Spinner />}
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default RecipeImage;
