import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { setEdit } from "../Store/Actions/Auth.Action";

const inputStyle = {
  margin: "0px 5px",
  color: "#0288d1",
  backgroundColor: "rgb(0, 30, 60)",
  padding: "0px 5px",
  outline: "none",
  border: "none",
  borderBottom: "solid #0288d1 1px",
  fontFamily: "monospace",
  fontSize: "18px",
  borderRadius: "3px",
};

const HiddenButton = () => {
  const dispatch = useDispatch();

  const authPin = useSelector((state) => state.auth.pin);

  const [showInput, setShowInput] = useState(false);
  const [pin, setpin] = useState("");

  const handleChange = (e) => {
    setpin(e.target.value);
    if (authPin === e.target.value) {
      dispatch(setEdit(true));
      setShowInput(false);
    } else {
      dispatch(setEdit(false));
    }
  };

  return (
    <div>
      <button className="hide" onClick={() => setShowInput(!showInput)}>
        HIDE
      </button>
      {showInput && (
        <input
          style={inputStyle}
          type="password"
          value={pin}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default HiddenButton;
