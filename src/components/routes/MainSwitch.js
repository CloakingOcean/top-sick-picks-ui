import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "../../containers/Index";
import CreateUpdateSong from "../../components/forms/CreateUpdateSong";

function MainSwitch() {
  return (
    <Router>
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
    </Router>
  );
}

export default MainSwitch;
