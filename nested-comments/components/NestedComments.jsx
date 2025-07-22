import React, { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import Comment from "./Comment";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [comment, setComment] = useState("");
  const { comments: commentsData } = useCommentTree(comments);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {};

  const handleReply = () => {};

  return (
    <div>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button onClick={handleSubmit} className="comment-button">
          Add Comment
        </button>
      </div>

      {commentsData.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onSubmitComment={handleReply}
        />
      ))}
    </div>
  );
};

export default NestedComments;
