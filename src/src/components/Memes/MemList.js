import React from "react";

import MemItem from "./MemItem";

const MemList = ({ memes, onRemoveMem, onEditMem, authUser, onAddComment }) => (
  <ul>
    {memes.map(mem => (
      <MemItem
        key={mem.uid}
        mem={mem}
        onRemoveMem={onRemoveMem}
        onEditMem={onEditMem}
        authUser={authUser}
        onAddComment={onAddComment}
      />
    ))}
  </ul>
);

export default MemList;
