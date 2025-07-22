import React, { useState } from "react";

const Comment = ({ comment = {}, onSubmitComment = () => {} }) => {
  const [expand, setExpand] = useState(false);
  const [reply, setReply] = useState("");

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleReplySubmit = () => {
    if (reply) {
      onSubmitComment(comment.id, reply);
      setReply("");
    }
  };

  return (
    <div className="comment">
      <>
        <p className="comment-content">{comment.content}</p>
        <p className="comment-info">Votes: {comment.votes}</p>
        <p className="comment-info">
          {new Date(comment.timestamp).toLocaleString()}
        </p>
      </>
      <div className="comment-actions">
        <button onClick={toggleExpand} className="comment-button">
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button className="comment-button">Edit</button>
        <button className="comment-button">Delete</button>
      </div>

      {expand && (
        <>
          <div className="add-comment">
            <textarea
              value={reply}
              onChange={handleChange}
              rows={3}
              cols={50}
              className="comment-textarea"
              placeholder="Add a new comment..."
            />
            <button onClick={handleReplySubmit} className="comment-button">
              Add Comment
            </button>
          </div>
          {comment?.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onSubmitComment={onSubmitComment}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Comment;
