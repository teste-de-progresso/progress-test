import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard } from '../pages/dashboard'
import { List, New, Show, Review, Edit } from "../pages/question";
import { Profile } from "../pages/session";
import { QuestionRoutePaths, SessionRoutePaths, DashboardRoutePaths } from './paths'

export const PrivateRoutes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to={DashboardRoutePaths.index} />
    </Route>
    <Route exact path={DashboardRoutePaths.index} component={Dashboard} />
    <Route exact path={SessionRoutePaths.show} component={Profile} />
    <Route exact path={QuestionRoutePaths.index} component={List} />
    <Route exact path={QuestionRoutePaths.new} component={New} />
    <Route exact path={QuestionRoutePaths.show} component={Show} />
    <Route exact path={QuestionRoutePaths.edit} component={Edit} />
    <Route exact path={QuestionRoutePaths.review} component={Review} />
  </Switch>
);
