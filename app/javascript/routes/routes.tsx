import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AssessmentList } from "../pages/assessment";
import { NewAssessement } from "../pages/assessment/NewAssessement";
import { Dashboard } from '../pages/dashboard';
import { Edit, List, New, Review, Show } from "../pages/question";
import { Profile } from "../pages/session";
import { AssessmentRoutePaths, DashboardRoutePaths, QuestionRoutePaths, SessionRoutePaths } from './paths';

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
    <Route exact path={AssessmentRoutePaths.new} component={NewAssessement} />
  </Switch>
);
