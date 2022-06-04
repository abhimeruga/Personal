import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { database } from "../../firestore/firebase";
import BasicModal from "../../Components/BasicModal";
import TrackerModalContent from "../Components/TrackerModalContent";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";

const Tracker = ({}) => {
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
      setTrackerDetails(Object.entries(data[0].data));
    });
  }, []);

  return (
    <>
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
  );
};

export default Tracker;
