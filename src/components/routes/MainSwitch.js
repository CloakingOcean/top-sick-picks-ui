import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "../../containers/Index";
import UpdateSong from "../../components/forms/UpdateSong";
import CreateSong from "../../components/forms/CreateSong";

function MainSwitch() {
  return (
    <Router>
      <Route exact path="/">
        <Index />
      </Route>

      <Route path="/api/songs/createSong" component={CreateSong} />

      <Route path="/api/songs/updateSong/:id" component={UpdateSong} />
    </Router>
  );
}

export default MainSwitch;
