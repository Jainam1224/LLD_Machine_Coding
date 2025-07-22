import React, { useState } from "react";

const useCommentTree = (initialComment) => {
  const [comments, setComments] = useState(initialComment);
  return { comments };
};

export default useCommentTree;
