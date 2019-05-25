import React from "react";
import Memes from "../Memes";
import MemBrowser from "../Memes/memBrowser";

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <span>
      <MemBrowser />
      <Memes />
    </span>
  </div>
);

export default Landing;
