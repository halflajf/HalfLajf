import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <div onClick={firebase.doSignOut} className="red-text">Sign Out</div>
);

export default withFirebase(SignOutButton);
