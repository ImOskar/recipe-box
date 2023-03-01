import { useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import { MdReply } from "react-icons/md";
import Button from "../ui/Button";
import styles from "./CommentPost.module.css";
import CommentInput from "./CommentiInput";
import ReactTimeAgo from "react-time-ago";

export type CommentType = {
  id?: string;
  recipeId?: string;
  user: string;
  userId: string;
  timestamp: Date;
  comment: string;
  replies?: CommentType[];
};

type CommentProps = {
  reply?: boolean;
  comment: CommentType;
  handleSaveComment: (comment: CommentType, method: string) => void;
};

function CommentPost({ reply, comment, handleSaveComment }: CommentProps) {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      <div
        className={reply ? `${styles.comment} ${styles.reply}` : styles.comment}
      >
        <span className={styles.avatar}>
          <TbUserCircle />
        </span>
        <div className={styles.commentcontent}>
          <div className={styles.nameanddate}>
            <p>{comment.user}</p>
            <span>
              <ReactTimeAgo date={new Date(comment.timestamp)} locale="en-US" />
            </span>
          </div>
          <div className={styles.post}>
            <p>{comment.comment}</p>
          </div>
        </div>
      </div>
      {typeof comment.replies !== "undefined" &&
        comment.replies.map((reply) => (
          <CommentPost
            key={reply.userId! + Math.random()}
            reply
            comment={reply}
            handleSaveComment={handleSaveComment}
          />
        ))}
      {!reply && !showInput && (
        <Button onClick={() => setShowInput(true)} addStyle={"reply"}>
          <MdReply />
          Reply
        </Button>
      )}
      {showInput && (
        <CommentInput
          reply
          parentComment={comment}
          handleSaveComment={handleSaveComment}
        />
      )}
    </>
  );
}

export default CommentPost;
