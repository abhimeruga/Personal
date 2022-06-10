import React from "react";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import "./App.css";
import Tracker from "./Modules/Tracker/Tracker";
import HiddenButton from "./Components/HiddenButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const authEdit = useSelector((state) => state.auth.edit);
  return (
    <div className="App">
      <header className="App-header">
        {authEdit && <Tracker />}
        {!authEdit && (
          <Alert severity="warning">
            This is is under construction and meant from Abhishek's personal
            use.
          </Alert>
        )}
        <HiddenButton />
      </header>
    </div>
  );
}

export default App;
