import React from "react";

import Header from "../header/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "../footer/Footer";

import Index from "../../containers/Index";
import CreateUpdateSong from "../../components/forms/CreateUpdateSong";

function MainSwitch() {
  return (
    <Router>
      <Route path="/" component={Header} />

      <Route exact path="/">
        <Index />
      </Route>

      <Route
        path="/api/songs/createSong"
        render={(props) => {
          return <CreateUpdateSong {...props} create={true} />;
        }}
      />

      <Route
        path="/api/songs/updateSong/:id"
        render={(props) => {
          return <CreateUpdateSong {...props} create={false} />;
        }}
      />

      <Route path="/" component={Footer} />
    </Router>
  );
}

export default MainSwitch;
