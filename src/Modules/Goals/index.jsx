import React from "react";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Goals = () => {
  const familyResponsibility = `SM2-[23]  H-[24]  D-[25]`;
  const selfGoals = `B-[23]  C-[24]  G-[25]`;
  return (
    <>
      <>
        <Alert icon={false} severity="info">
          {familyResponsibility}
        </Alert>
        <br />
        <Alert icon={false} severity="info">
          {selfGoals}
        </Alert>

        <Alert icon={false} severity="info">
          {`Achieve NIRVANA`}
        </Alert>

        <br />
      </>
    </>
  );
};

export default Goals;
