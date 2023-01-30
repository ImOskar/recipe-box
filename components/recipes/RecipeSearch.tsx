import { useRouter } from "next/router";
import Button from "../ui/Button";
import { MdSearch } from "react-icons/md";
import styles from "./RecipeSearch.module.css";
import { useState } from "react";

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.currentTarget.value;
    setQuery(inputValue);
  };

  const handleSearch = () => {
    if (query === "") return;
    router.push(`/search/${query}`);
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        id="search"
        placeholder="Search recipes"
        onChange={handleSearchInput}
      />{" "}
      <Button addStyle={"search"} onClick={handleSearch}>
        <MdSearch />
      </Button>
    </div>
  );
}

export default RecipeSearch;
