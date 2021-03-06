import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

import { database } from "../../firestore/firebase";
import BasicModal from "../../Components/BasicModal";
import TrackerModalContent from "../Components/TrackerModalContent";
import { setTrackerData } from "../../Store/Actions/Tracker.Action";
import { setPin } from "../../Store/Actions/Auth.Action";
import { filterDocData } from "../Utils/TrackerUtils";

import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Tracker = ({}) => {
  const dispatch = useDispatch();
  const authEdit = useSelector((state) => state.auth.edit);

  const [trackerDetails, setTrackerDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [trackerItem, setTrackerItem] = useState({
    habit: "",
    stoppedOn: "",
    reasonForReVisiting: "",
    reasonForQuitting: "",
    reVisitedOn: "",
    numberOfDaysNotDoingIt: "",
    history: "",
  });

  useEffect(() => {
    const q = query(collection(database, "personal"));
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      const trackerData = filterDocData(data, "badHabits");
      const authData = filterDocData(data, "Auth");
      dispatch(setPin(authData.writeAuth));
      dispatch(setTrackerData(trackerData));
      setTrackerDetails(Object.entries(trackerData));
    });
  }, []);

  return (
    authEdit && (
      <>
        <Alert severity="info">{"Tracking My Habits"}</Alert>
        {!trackerDetails.length && (
          <>
            <CircularProgress color="inherit" size={20} />
            Loading Data...
          </>
        )}
        {trackerDetails.length > 0 &&
          trackerDetails.map((trackerDetailItem, key) => {
            return (
              <div key={key}>
                <Button
                  onClick={() => {
                    setOpen(true);
                    setTrackerItem({
                      habit: trackerDetailItem[0],
                      stoppedOn: trackerDetailItem[1].stoppedOn,
                      reasonForReVisiting:
                        trackerDetailItem[1].reasonForReVisiting,
                      reasonForQuitting: trackerDetailItem[1].reasonForQuitting,
                      reVisitedOn: trackerDetailItem[1].reVisitedOn,
                      numberOfDaysNotDoingIt:
                        trackerDetailItem[1].numberOfDaysNotDoingIt,
                      history: trackerDetailItem[1].history,
                    });
                  }}
                >
                  {trackerDetailItem[0]}
                </Button>
              </div>
            );
          })}
        <BasicModal
          header={trackerItem.habit}
          content={<TrackerModalContent {...trackerItem} />}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      </>
    )
  );
};

export default Tracker;
