import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import { UserList, UserItem } from "../Users";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import CreateMem from "./createMem";
import MemBrowser from "../Memes/memBrowser";
import ManageMem from "./manageMemes";

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Switch>
      <Route exact path={ROUTES.ADMIN_ADD_MEM} component={ManageMem} />
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
