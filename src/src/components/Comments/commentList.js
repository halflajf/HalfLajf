import React from "react";

import CommentItem from "./commentItem";

const CommentList = ({ memes }) => (
  <ul>
    {memes.comment.map((mem, i) => (
      <CommentItem key={i} mem={mem} />
    ))}
  </ul>
);

export default CommentList;
