import { useRouter } from "next/router";

function AddRecipePage() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("./");
  };

  return <div></div>;
}

export default AddRecipePage;
