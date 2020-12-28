import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { StringUtil } from 'Util/Helpers';
import { yellow, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  errorMsg: {
    display: 'flex',
    alignItems: 'center'
  },
  errorIcon: {
    marginRight: theme.spacing(0.5)
  },
  warning: {
    backgroundColor: yellow[800]
  },
  success: {
    backgroundColor: green[600]
  }
}));

function ErrorSnackbar(props) {
  const classes = useStyles();

  const { message, variant, centered, ...other } = props;
  let centeredStyle = {};

  if (centered) {
    centeredStyle = {
      display: "flex",
      justifyContent: "center"
    }
  }

  if (StringUtil.isNullOrEmpty(message))
    return null;

  if (StringUtil.isEqual(variant, 'success')) {
    return <Box className={classes.success} color="error.contrastText" p={1} borderRadius={3} {...other} {...centeredStyle}>
      <span className={classes.errorMsg}><CheckCircleIcon className={classes.errorIcon} />{message}</span>
    </Box>
  }

  if (StringUtil.isEqual(variant, 'warning')) {
    return <Box className={classes.warning} color="error.contrastText" p={1} borderRadius={3} {...other} {...centeredStyle}>
      <span className={classes.errorMsg}><ErrorIcon className={classes.errorIcon} />{message}</span>
    </Box>
  }

  return <Box bgcolor="error.main" color="error.contrastText" p={1} borderRadius={3} {...other} {...centeredStyle}>
    <span className={classes.errorMsg}><ErrorIcon className={classes.errorIcon} />{message}</span>
  </Box>
}

ErrorSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['', 'error', 'warning', 'success']),
};

export default ErrorSnackbar;