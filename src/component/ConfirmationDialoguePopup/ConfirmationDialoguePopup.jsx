import React from "react";
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Style from "./ConfirmationDialogueBox.style";
import ButtonTag from '../Button/Button';


function ConfirmationDialogRaw(props) {
  const { classes, onClose, value: valueProp, open, LabelOfOption, styleForSelectedOption, options, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
      PaperProps={{ classes: {root: classes[styleForSelectedOption]} }}
    >
      <DialogTitle style={{ textAlign: "center"}}>{ LabelOfOption }</DialogTitle>
      <DialogContent >
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              className={classes.cardStyleOfradio}
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions style={{ display: "inline-block" }}>
        <ButtonTag onClick={handleCancel} styleOfBtn={classes.cancelBtStyle}>
          Cancel
        </ButtonTag>
        <ButtonTag onClick={handleOk} styleOfBtn={classes.okBtnStyle }>
          Ok
        </ButtonTag>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};


export default withStyles(Style)(ConfirmationDialogRaw);