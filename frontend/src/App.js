import { Home } from "./components_backup/Home";
import { Signin } from "./components_backup/Signin";
import "./styles.css";
import React, { Fragment, useContext, useEffect } from "react";
import { UserContext } from "./components_backup/UserProvider";
// import Home from "./components/Home";
import { AskSwitchProvider } from "./contexts/AskSwitchContext";

export default function App() {
  const user = useContext(UserContext);

  return (
    <div className="App">
      <Fragment>
        {!user ? (
          <Signin />
        ) : (
          <AskSwitchProvider>
            <Home />
          </AskSwitchProvider>
        )}
      </Fragment>
      {/* <Home /> */}
    </div>
  );
}
