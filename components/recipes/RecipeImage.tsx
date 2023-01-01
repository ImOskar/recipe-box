import { Dispatch, SetStateAction, useRef } from "react";
import Button from "../ui/Button";
import styles from "./RecipeImage.module.css";

type ImageProps = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

function RecipeImage({ image, setImage }: ImageProps) {
  const photoRef = useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    photoRef.current?.click();
    // if(photoRef.current !== null) {
    //   let file = photoRef.current.files!;
    //   file[0].name;
    // }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    console.log(file);
    setImage(preview);
    //const imageUrl = await uploadImage...
    //setImage(imageUrl);
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
        type="button"
      >
        <i className="material-icons">add_a_photo</i>
      </Button>
      {image !== "" && <img src={image} alt="Upload image" />}
    </div>
  );
}

export default RecipeImage;
