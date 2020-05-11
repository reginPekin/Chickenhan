import React from "react";
import ReactDOM from "react-dom";

import { FirstComponent } from "@chickenhan/components/src/FirstComponent";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <span>Hallo</span>
      <FirstComponent />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
