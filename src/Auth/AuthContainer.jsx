import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    marginBottom: theme.spacing(1.5)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function Copyright() {
  return <Typography variant="body2" color="textSecondary" align="center">
    Copyright © Test Inc. {new Date().getFullYear()}
  </Typography>
}

function AuthContainer(props) {
  const { children } = props;

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src="img/mock_logo.png" className={classes.logo} alt={'logo'}></img>
        {children}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AuthContainer;