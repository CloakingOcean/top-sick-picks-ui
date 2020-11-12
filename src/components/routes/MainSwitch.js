import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "../../containers/Index";
import EditSong from "../../components/forms/EditSong";
import UpdateSong from "../../components/forms/UpdateSong";

function MainSwitch() {
  return (
    <Router>
      <Route exact path="/">
        <Index />
      </Route>

      <Route path="/api/songs/editSong/:id" component={EditSong} />

      <Route path="/api/songs/updateSong/:id" component={UpdateSong} />
    </Router>
  );
}

export default MainSwitch;
