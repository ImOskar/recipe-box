import { useRouter } from "next/router";
import Button from "../ui/Button";
import { MdSearch } from "react-icons/md";
import styles from "./RecipeSearch.module.css";
import React, { useEffect, useRef, useState } from "react";

function RecipeSearch() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    searchRef.current!.focus();
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.currentTarget.value;
    setQuery(inputValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    if (query === "") return;
    router.push(`/search/${query}`);
    //setQuery("");
  };

  return (
    <div className={styles.searchbar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Search recipes"
          onChange={handleSearchInput}
          ref={searchRef}
        />{" "}
      </form>
      <Button addStyle={"search"} onClick={handleSearch}>
        <MdSearch />
      </Button>
    </div>
  );
}

export default RecipeSearch;
