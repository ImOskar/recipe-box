import { useEffect, useState } from "react";
import Header from "../ui/Header";
import CommentInput from "./CommentiInput";
import styles from "./CommentList.module.css";
import CommentPost, { CommentType } from "./CommentPost";

type CommentListProps = {
  recipeId: string;
};

function CommentList({ recipeId }: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      setFetching(true);
      const res = await fetch(`/api/comments?recipeId=${recipeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let { comments } = await res.json();
      setComments(comments);
      setFetching(false);
    };
    handleFetch();
  }, [recipeId]);

  const handleSaveComment = async (comment: CommentType, method: string) => {
    try {
      const res = await fetch("/api/comments", {
        method: method,
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      if (method === "POST") setComments([...comments, comment]);
      else
        setComments(
          comments.map((comm) => {
            if (comm.id === comment.id) return comment;
            else return comm;
          })
        );
    } catch (error) {}
  };

  return (
    <div className={styles.commentlist}>
      <Header>Comments:</Header>
      <CommentInput recipeId={recipeId} handleSaveComment={handleSaveComment} />
      <hr></hr>
      {fetching && <p>Fetching comments...</p>}
      {!fetching && !comments?.length && (
        <p className={styles.title}>Be the first to comment on this recipe!</p>
      )}
      {!fetching &&
        !!comments?.length &&
        comments.map((comment) => (
          <CommentPost
            key={comment.id}
            comment={comment}
            handleSaveComment={handleSaveComment}
          />
        ))}
    </div>
  );
}

export default CommentList;
