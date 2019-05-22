import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, MemUid }) => (
  <ul>
    {console.log(comments)}
    {comments.map((comment, i) => (
      <CommentItem key={i} comment={comment} index={i} MemUid={MemUid} />
    ))}
  </ul>
);

export default CommentList;
