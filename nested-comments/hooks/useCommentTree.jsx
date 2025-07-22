import React, { useState } from "react";

const useCommentTree = (initialComment) => {
  const [comments, setComments] = useState(initialComment);

  const insertNode = (tree, parentCommentId, content) => {
    return tree.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, parentCommentId, content),
        };
      }
      return comment;
    });
  };

  const insertComment = (parentCommentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (parentCommentId) {
      setComments((prevComments) =>
        insertNode(prevComments, parentCommentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editNode = (tree, parentCommentId, content) => {
    return tree.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, parentCommentId, content),
        };
      }
      return comment;
    });
  };

  const editComment = (parentCommentId, content) => {
    setComments((prevComments) =>
      editNode(prevComments, parentCommentId, content)
    );
  };

  return { comments, insertComment, editComment };
};

export default useCommentTree;
