import { StrictMode } from "react";
import ReactDOM from "react-dom";
import UserProvider from "./components_backup/UserProvider";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
  rootElement
);
