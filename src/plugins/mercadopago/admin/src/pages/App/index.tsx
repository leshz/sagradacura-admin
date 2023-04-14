/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";

const NewSwitch = Switch as any;
const NewRoute = Route as any;
const App = () => {
  return (
    <div>
      <NewSwitch>
        <NewRoute path={`/plugins/${pluginId}`} component={HomePage} exact />
        <NewRoute component={NotFound} />
      </NewSwitch>
    </div>
  );
};

export default App;
