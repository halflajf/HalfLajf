import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ memes, uid }) => (
  <ul>
    {memes.map((mem, i) => (
      <CommentItem key={i} mem={mem} pentla={i} uid={uid} />
    ))}
  </ul>
);

export default CommentList;
