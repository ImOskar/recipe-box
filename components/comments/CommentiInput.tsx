import { useState } from "react";
import Button from "../ui/Button";
import { CommentType } from "./CommentPost";
import styles from "./CommentInput.module.css";
import { useSession } from "next-auth/react";

type CommentInputProps = {
  reply?: boolean;
  parentComment?: CommentType;
  recipeId?: string;
  handleSaveComment: (comment: CommentType, method: string) => void;
};

function CommentInput({
  reply,
  parentComment,
  recipeId,
  handleSaveComment,
}: CommentInputProps) {
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const handleComment = () => {
    if (comment === "") return;
    let id = reply ? parentComment?.recipeId : recipeId;
    let newComment = {
      id: Math.random().toString(),
      recipeId: id,
      user: session?.user.name!,
      userId: session?.user.id!,
      timestamp: new Date(),
      comment: comment,
    };
    if (reply && parentComment) {
      if (typeof parentComment?.replies !== "undefined")
        parentComment.replies.push(newComment);
      else parentComment = { ...parentComment, replies: [newComment] };
      handleSaveComment(parentComment, "PUT");
    } else handleSaveComment(newComment, "POST");
    setComment("");
  };

  return (
    <div
      className={reply ? `${styles.inputbox} ${styles.reply}` : styles.inputbox}
    >
      <input
        className={styles.input}
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={`Write a ${reply ? "reply" : "comment"}...`}
        required
      />
      <Button
        onClick={handleComment}
        addStyle="med"
        disabled={session === null}
      >
        {reply ? "Reply" : "Comment"}
      </Button>
    </div>
  );
}

export default CommentInput;
