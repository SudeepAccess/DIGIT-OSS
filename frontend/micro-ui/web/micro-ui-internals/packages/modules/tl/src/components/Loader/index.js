import React from "react";
import { Backdrop } from "@mui/material";

const Spinner = () => (
  <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <div className="loader-dots">Loading</div>
  </Backdrop>
);

export default Spinner;
