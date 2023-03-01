import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RecipeList from "../../../components/recipes/RecipeList";
import Spinner from "../../../components/ui/Spinner";

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    const searchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search`, {
          method: "POST",
          body: JSON.stringify(query),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let result = await res.json();
        setSearchResult(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    searchRecipes();
  }, [query]);

  return (
    <div>
      <Head>
        <title>Search results</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      {loading && <Spinner style={"spinnerlrg"} />}
      {!loading && (
        <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
          Found {searchResult.length}{" "}
          {searchResult.length === 1 ? "match" : "matches"} for: {query}
        </p>
      )}
      {!!searchResult.length && (
        <RecipeList recipes={searchResult} lastItem={true} />
      )}
    </div>
  );
}

export default Search;
