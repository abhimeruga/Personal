import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  doc,
  updateDoc,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";

import CircularProgress from "@mui/material/CircularProgress";
import { keyframes } from "styled-components";

import { database } from "../../firestore/firebase";
import "../../App.css";

const habitStyle = {
  display: "flex",
  alignContent: "center",
  width: "100%",
  alignItems: "center",
};

const inputStyle = {
  margin: "0px 5px",
  color: "#a6e22e",
  backgroundColor: "rgb(0, 30, 60)",
  padding: "0px 5px",
  outline: "none",
  border: "none",
  borderBottom: "solid white 1px",
  fontFamily: "monospace",
  fontSize: "18px",
};

const serverDataStyle = {
  fontFamily: "fantasy",
  backgroundColor: "#bbdefb",
  color: "#006064",
  margin: " 0px 5px",
  padding: "0px 10px",
  borderRadius: "10px",
};

const TrackerModalContent = ({
  habit = "",
  stoppedOn = "",
  reasonForReVisiting = "",
  reasonForQuitting = "",
  reVisitedOn = "",
  numberOfDaysNotDoingIt = "",
  history = [],
}) => {
  const [trackerItem, setTrackerItem] = useState({
    stoppedOn,
    reasonForReVisiting,
    reasonForQuitting,
    reVisitedOn,
    numberOfDaysNotDoingIt,
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, seAddLoading] = useState(false);
  const authEdit = useSelector((state) => state.auth.edit);

  const handleSubmit = (e) => {
    setEdit(false);
    setLoading(true);
    e.preventDefault();

    const q = query(collection(database, "personal"));
    onSnapshot(q, async (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const index = data.findIndex((item) => item.id === "badHabits");
      data[index].data[habit] = { ...data[index].data[habit], ...trackerItem };
      const taskDocRef = doc(database, "personal", "badHabits");
      try {
        await updateDoc(taskDocRef, data[index].data);
        setLoading(false);
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    });
  };

  const handleAddDaysClick = (e) => {
    setEdit(false);
    seAddLoading(true);
    e.preventDefault();

    const q = query(collection(database, "personal"));
    onSnapshot(q, async (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const index = data.findIndex((item) => item.id === "badHabits");

      data[index].data[habit] = {
        ...data[index].data[habit],
        numberOfDaysNotDoingIt: (
          parseInt(trackerItem.numberOfDaysNotDoingIt ?? 0) + 1
        ).toString(),
      };
      const taskDocRef = doc(database, "personal", "badHabits");
      try {
        await updateDoc(taskDocRef, data[index].data);
        seAddLoading(false);
      } catch (err) {
        alert(err);
        seAddLoading(false);
      }
    });
    console.log("hel");
  };

  return (
    <>
      {!loading && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {authEdit && (
            <Button
              style={{
                position: "absolute",
                top: "3px",
                left: "415px",
                width: "0%",
              }}
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit
            </Button>
          )}

          <div style={habitStyle}>
            Stopped On -{" "}
            {!edit && <span style={serverDataStyle}>{stoppedOn}</span>}
            {edit && (
              <input
                style={inputStyle}
                value={trackerItem.stoppedOn}
                onChange={(event) => {
                  setTrackerItem({
                    ...trackerItem,
                    stoppedOn: event.target.value,
                  });
                }}
                id="standard-basic"
              />
            )}
          </div>

          <div style={habitStyle}>
            Reason For Quitting -{" "}
            {!edit && <span style={serverDataStyle}>{reasonForQuitting}</span>}
            {edit && (
              <textarea
                style={inputStyle}
                id="standard-basic"
                value={trackerItem.reasonForQuitting}
                onChange={(event) => {
                  setTrackerItem({
                    ...trackerItem,
                    reasonForQuitting: event.target.value,
                  });
                }}
              />
            )}
          </div>

          <div style={habitStyle}>
            Reason for Revisiting -{" "}
            {!edit && (
              <span style={serverDataStyle}>{reasonForReVisiting}</span>
            )}
            {edit && (
              <textarea
                style={inputStyle}
                id="standard-basic"
                value={trackerItem.reasonForReVisiting}
                onChange={(event) => {
                  setTrackerItem({
                    ...trackerItem,
                    reasonForReVisiting: event.target.value,
                  });
                }}
              />
            )}
          </div>

          <div style={habitStyle}>
            Re-Visited On -
            {!edit && <span style={serverDataStyle}>{reVisitedOn}</span>}
            {edit && (
              <input
                style={inputStyle}
                id="standard-basic"
                value={trackerItem.reVisitedOn}
                onChange={(event) => {
                  setTrackerItem({
                    ...trackerItem,
                    reVisitedOn: event.target.value,
                  });
                }}
              />
            )}
          </div>

          <div style={habitStyle}>
            Number of Days Not Doing It -{" "}
            {!edit && (
              <span style={serverDataStyle}>{numberOfDaysNotDoingIt}</span>
            )}
            {edit && (
              <input
                style={inputStyle}
                id="standard-basic"
                value={trackerItem.numberOfDaysNotDoingIt}
                onChange={(event) => {
                  setTrackerItem({
                    ...trackerItem,
                    numberOfDaysNotDoingIt: event.target.value,
                  });
                }}
              />
            )}
            {!edit && (
              <Button className="addDaysStyle" onClick={handleAddDaysClick}>
                + {addLoading && <CircularProgress color="inherit" size={20} />}
              </Button>
            )}
          </div>

          {edit && (
            <Button style={{ width: "100%" }} onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Box>
      )}

      {loading && <CircularProgress color="inherit" size={20} />}
    </>
  );
};

export default TrackerModalContent;
