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
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(null, comment);
      setComment("");
    }
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

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
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
        />
      ))}
    </div>
  );
};

export default NestedComments;
