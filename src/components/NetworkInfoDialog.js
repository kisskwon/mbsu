import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

const NetworkInfoDialog = ({ isOpen, onComplete }) => {
  /* const [tvNetworkInfo, setTVNetworkInfo] =
    useRecoilState(tvNetworkInformation); */
  //console.log("isOpen " + isOpen);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [macAddr, setMacAddr] = useState();
  const [ipAddr, setIpAddr] = useState("");

  useEffect(() => {
    setIsOpenDialog(isOpen);
  }, [isOpen]);

  const handleDialogClose = () => {
    onComplete();
  };

  const macAddrChanged = (e) => {
    var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
      str = e.target.value.replace(/[^a-f0-9]/gi, "");

    while (r.test(str)) {
      str = str.replace(r, "$1" + ":" + "$2");
    }

    e.target.value = str.slice(0, 17);
    setMacAddr(e.target.value);
  };

  const ipAddrChanged = (e) => {
    var str = e.target.value;
    var temp = str.split(".");

    if (
      temp.length > 4 ||
      (temp.length === 4 && temp[3].length > 3) ||
      temp[temp.length - 1].length > 3
    ) {
      e.target.value = str.substr(0, str.length - 1);
    }

    console.log("ipAddr = " + e.target.value);
    setIpAddr(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("macAddr", macAddr);
    localStorage.setItem("ipAddr", ipAddr);
    //setTVNetworkInfo({ ...tvNetworkInfo, macAddr: macAddr, ipAddr: ipAddr });
    handleDialogClose();
  };

  return (
    <>
      <Dialog open={isOpenDialog} onClose={handleDialogClose}>
        <DialogTitle>Network Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input your TV network information
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="macAddr"
            label="MAC Address"
            type="text"
            maxLength="17"
            fullWidth
            variant="outlined"
            defaultValue={
              localStorage.getItem("macAddr") || "FF:FF:FF:FF:FF:FF"
            }
            onChange={macAddrChanged}
          />
          <TextField
            margin="dense"
            id="ipAddr"
            label="IP Address"
            type="text"
            inputProps={{ inputMode: "decimal" }}
            fullWidth
            variant="outlined"
            defaultValue={localStorage.getItem("ipAddr")}
            onChange={ipAddrChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NetworkInfoDialog;
