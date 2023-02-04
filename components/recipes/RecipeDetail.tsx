import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Recipe } from "../../pages/add-recipe";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styles from "./RecipeDetail.module.css";
import fallbackImage from "../../public/pexels-ella-olsson-1640774.jpg";
import Link from "next/link";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";
import Chip from "../ui/Chip";

type DetailProps = {
  recipe: Recipe;
  handleDelete: () => Promise<void>;
  handleLike: (id: string) => void;
};

function RecipeDetail({ recipe, handleDelete, handleLike }: DetailProps) {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(recipe.likes);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-recipe/${recipe.id}`);
  };

  const handleUserLike = () => {
    if (!session) {
      router.push(`/log-in`);
      return;
    }
    let id = session?.user?.id as string;
    handleLike(id);
    setLikes((likes) => {
      if (!likes) return [id];
      if (likes.includes(id)) {
        return likes.filter((like) => like !== id);
      }
      return [...likes, id];
    });
  };

  const image: boolean =
    typeof recipe.image !== "undefined" &&
    recipe.image !== "" &&
    "image" in recipe;

  const likeCount = (): string => {
    if (!likes) return "0 likes";
    else if (likes.length === 1) return `${likes.length} like`;
    else return `${likes.length} likes`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.recipeheader}>
        <h1>{recipe.title}</h1>
        <span></span>
        {recipe.author && <h3>By: {recipe.author}</h3>}
        <div
          className={recipe.recipeCategories?.length! >= 1 ? styles.chips : ""}
        >
          {recipe.recipeCategories?.map((cat) => {
            return <Chip key={cat} item={cat} />;
          })}
        </div>
      </div>
      <span className={styles.image}>
        <Image
          src={image ? recipe.image! : fallbackImage}
          alt="Recipe image"
          fill
          priority
          //placeholder="blur"
        />
      </span>
      <div className={styles.recipedetails}>
        <div className={styles.likescontainer}>
          <div className={styles.cooktime}>
            {recipe.prepTime && (
              <div>
                <span className={styles.timetitle}>Prep time:</span>
                <span>{recipe.prepTime}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div>
                <span className={styles.timetitle}>Cook time:</span>
                <span>{recipe.cookTime}</span>
              </div>
            )}
            {recipe.totalTime && (
              <div>
                <span className={styles.timetitle}>Total time:</span>
                <span>{recipe.totalTime}</span>
              </div>
            )}
            {recipe.recipeYield && (
              <div>
                <span className={styles.timetitle}>Servings:</span>
                <span>{recipe.recipeYield}</span>
              </div>
            )}
          </div>
          <div className={styles.likes}>
            <Button addStyle={"like"} onClick={handleUserLike}>
              {session && likes?.includes(session.user.id) ? (
                <MdFavorite />
              ) : (
                <MdFavoriteBorder />
              )}
            </Button>
            <p>{likeCount()}</p>
          </div>
        </div>
        {recipe.description && (
          <p className={styles.description}>{recipe.description}</p>
        )}
        <div className={styles.sectiontitle}>
          <p>Ingredients:</p>
          <div className={styles.seperator}></div>
        </div>
        <ul>
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
        <div className={styles.sectiontitle}>
          <p>Instructions:</p>
          <div className={styles.seperator}></div>
        </div>
        <ul className={styles.list}>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
        {typeof recipe.url !== "undefined" && recipe.url !== "" && (
          <Link href={recipe.url}>
            Original recipe
            <TbExternalLink />
          </Link>
        )}
        {session !== null && session?.user.id === recipe.userId && (
          <span className={styles.buttons}>
            <Button addStyle={["med", "edit"]} onClick={handleEdit}>
              <MdEditNote />
              Edit recipe
            </Button>
            <Button
              addStyle={["med", "alert"]}
              onClick={() => setShowModal(true)}
            >
              <MdOutlineDeleteForever />
              Delete recipe
            </Button>
            {showModal && (
              <Modal deleteHandler={handleDelete} hideModal={setShowModal} />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
