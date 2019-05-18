import React from "react";

import MemItem from "./MemItem";

const MemList = ({ memes, onRemoveMem, onEditMem, authUser }) => (
  <ul>
    {memes.map(mem => (
      <MemItem
        key={mem.uid}
        mem={mem}
        onRemoveMem={onRemoveMem}
        onEditMem={onEditMem}
        authUser={authUser}
      />
    ))}
  </ul>
);

export default MemList;
