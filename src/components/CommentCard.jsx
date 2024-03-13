import { useState, useContext, useEffect } from "react";
import { deleteComment } from "../api";
import { UserContext } from "./UserContext";
import "../App.css";

const CommentCard = ({ comment, setComments }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isCommentDeleted, setIsCommentDeleted] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const removeComment = () => {
    if (submitting) return;
    setIsCommentDeleted(true);
    setSubmitting(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setComments((oldComments) =>
          oldComments.filter((c) => c.comment_id !== comment.comment_id)
        );
        setSubmitting(false);
        alert('Comment deleted!')
      })
      .catch(() => {
        setIsCommentDeleted(false);
        setSubmitting(false);
        setError("Deleting comment failed");
      });
  };

  return (
    <div className="single-comment">
      <div className="delete-button">
        {loggedInUser.username === comment.author ? (
          <button onClick={removeComment} disabled={submitting}>
            X
          </button>
        ) : null}
      </div>
      <span className="italic">{comment.author}</span>
      <p>{comment.body}</p>
      <p>{comment.created_at}</p>
      <p>Votes: {comment.votes}</p>
      {submitting ? "Deleting..." : null}
    </div>
  );
};

export default CommentCard;
