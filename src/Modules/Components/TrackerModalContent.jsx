import { useState } from "react";
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
import { keyframes } from "styled-components";
import Box from "@mui/material/Box";

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

var backgroundColorPalette = keyframes`
0% {
    background: #ee6055;
}
25% {
    background: #60d394;
}
50% {
    background: #aaf683;
}
75% {
    background: #ffd97d;
}
100% {
    background: #ff9b85;
}
`;

const colorEffect = {
  animationName: backgroundColorPalette,
  animationDuration: "5s",
  animationIterationCount: "infinite",
  animationDirection: "alternate",
  animationTimingFunction: "linear",
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
            style={{ position: "absolute", top: "8px", left: "50px" }}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </Button>

          <div style={habitStyle}>
            <p>
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
            </p>
          </div>

          <div style={habitStyle}>
            <p>
              Reason For Quitting -{" "}
              {!edit && (
                <span style={serverDataStyle}>{reasonForQuitting}</span>
              )}
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
              {!edit && (
                <span style={serverDataStyle}>{reasonForReVisiting}</span>
              )}
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
            </p>
          </div>

          <div style={habitStyle}>
            <p>
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
            </p>
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
