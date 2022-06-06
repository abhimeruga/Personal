import "./App.css";
import Tracker from "./Modules/Tracker/Tracker";
import HiddenButton from "./Components/HiddenButton";
import { Provider } from "react-redux";
import store from "./Store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header">
          <Tracker />
          <HiddenButton />
        </header>
      </Provider>
    </div>
  );
}

export default App;
