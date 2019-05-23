import React from "react";

const CommentItem = ({ mem }) => (
  <li>
    <strong>{mem.userId}</strong> {mem}
  </li>
);

export default CommentItem;
