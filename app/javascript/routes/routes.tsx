import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Profile } from "../pages/session";
import { Dashboard } from '../pages/dashboard'
import { List, New, Show, Review, Edit } from "../pages/question";
import { AssessmentList } from "../pages/assessment";

import { QuestionRoutePaths, SessionRoutePaths, DashboardRoutePaths, AssessmentRoutePaths } from './paths'

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
    <Route exact path={AssessmentRoutePaths.index} component={AssessmentList} />
  </Switch>
);
