import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, MemUid, authUser }) => (
  <ul>
    {console.log(comments)}
    {comments.map((comment, i) => (
      <CommentItem
        key={i}
        comment={comment}
        index={i}
        MemUid={MemUid}
        authUser={authUser}
      />
    ))}
  </ul>
);

export default CommentList;
