import * as React from "react";
const AskSwitchContext = React.createContext();
function useAskSwitch() {
  const context = React.useContext(AskSwitchContext);
  if (!context) {
    throw new Error(`useAskSwitch must be used within a AskSwitchProvider`);
  }
  return context;
}
function AskSwitchProvider(props) {
  const [askSwitch, setAskSwitch] = React.useState(false);
  const value = React.useMemo(() => [askSwitch, setAskSwitch], [askSwitch]);
  return <AskSwitchContext.Provider value={value} {...props} />;
}
export { AskSwitchProvider, useAskSwitch };
