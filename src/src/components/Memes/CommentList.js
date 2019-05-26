import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, MemUid, authUser }) => (
  <ul className="comment section">
    {comments.map((comment, i) => (
      <li>
      <CommentItem
        key={i}
        comment={comment}
        index={i}
        MemUid={MemUid}
        authUser={authUser}
      />
      </li>
    ))}
  </ul>
);

export default CommentList;
