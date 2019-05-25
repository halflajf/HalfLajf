import React from "react";

import MemItem from "./MemItem";

const MemList = ({ memes, authUser, onAddComment }) => (
  <ul>
    {memes.map(mem => (
      <MemItem
        key={mem.uid}
        mem={mem}
        authUser={authUser}
        onAddComment={onAddComment}
      />
    ))}
  </ul>
);

export default MemList;
