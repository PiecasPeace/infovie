import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {Text} from 'react-native';

interface ICustomSnackBarProps {
  text: string;
  handleClick: () => void;
  handleClose: () => void;
  open: boolean | undefined;
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomSnackBar: React.FC<ICustomSnackBarProps> = ({
  text,
  handleClick,
  handleClose,
  open,
}: ICustomSnackBarProps) => {
  return (
    <Text style={{width: '100%'}}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {text}
        </Alert>
      </Snackbar>
    </Text>
  );
};
