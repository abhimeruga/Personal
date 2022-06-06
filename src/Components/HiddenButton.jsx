import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { setEdit } from "../Store/Actions/Auth.Action";

const HiddenButton = () => {
  const dispatch = useDispatch();

  const authPin = useSelector((state) => state.auth.pin);

  const [showInput, setShowInput] = useState(false);
  const [pin, setpin] = useState("");

  const handleChange = (e) => {
    setpin(e.target.value);
    if (authPin === e.target.value) {
      dispatch(setEdit(true));
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
        <input type="password" value={pin} onChange={handleChange} />
      )}
    </div>
  );
};

export default HiddenButton;
