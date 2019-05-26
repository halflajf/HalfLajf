import React from "react";
import Memes from "../Memes";
import MemBrowser from "../Memes/memBrowser";

const Landing = () => (
  <div className="dashboard container">
    <span>
      <MemBrowser />
      <Memes />
    </span>
  </div>
);

export default Landing;
