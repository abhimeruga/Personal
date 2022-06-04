import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  doc,
  updateDoc,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { database } from "../../firestore/firebase";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { async } from "@firebase/util";

const habitStyle = {
  display: "flex",
  alignContent: "center",
  width: "100%",
};

const inputStyle = {
  outline: "none",
  border: "none",
  borderBottom: "solid black 1px",
  fontFamily: "monospace",
  fontSize: "18px",
};

const serverDataStyle = {
  fontFamily: "fantasy",
  backgroundColor: "aquamarine",
  fontStyle: "italic",
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

      data[0].data[habit] = { ...data[habit], ...trackerItem };

      console.log(data[0].data);

      const taskDocRef = doc(database, "personal", "badHabits");
      try {
        await updateDoc(taskDocRef, data[0].data);

        setLoading(false);
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    });
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
          <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </Button>

          <div style={habitStyle}>
            <p>
              Stopped On -
              <span style={serverDataStyle}>
                {stoppedOn || trackerItem.stoppedOn}
              </span>
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
            </p>
          </div>

          <div style={habitStyle}>
            <p>
              Reason For Quitting -{" "}
              <span style={serverDataStyle}>
                {reasonForQuitting || trackerItem.reasonForQuitting}
              </span>
              {edit && (
                <input
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
            </p>
          </div>

          <div style={habitStyle}>
            <p>
              Reason for Revisiting -{" "}
              <span style={serverDataStyle}>
                {reasonForReVisiting || trackerItem.reasonForReVisiting}
              </span>
              {edit && (
                <input
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
            </p>
          </div>

          <div style={habitStyle}>
            <p>
              Re-Visited On -{" "}
              <span style={serverDataStyle}>
                {reVisitedOn || trackerItem.reVisitedOn}
              </span>
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
            </p>
          </div>

          <div style={habitStyle}>
            <p>
              Number of Days Not Doing It -{" "}
              <span style={serverDataStyle}>
                {numberOfDaysNotDoingIt || trackerItem.numberOfDaysNotDoingIt}
              </span>
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
            </p>
          </div>

          {edit && <Button onClick={handleSubmit}> Submit </Button>}
        </Box>
      )}

      {loading && <CircularProgress color="inherit" size={20} />}
    </>
  );
};

export default TrackerModalContent;
