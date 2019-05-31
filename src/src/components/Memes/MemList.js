import React from "react";

import MemItem from "./MemItem";

const MemList = ({ memes, authUser, onAddComment }) => (
  <div className="container">
    <div className="row">
      <div className="col s12">
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
      </div>
    </div>
  </div>
);

export default MemList;
