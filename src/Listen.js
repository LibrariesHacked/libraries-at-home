import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center'
  }
}));

function Listen(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="secondary" className={classes.subtitle}>Listen...</Typography>
      <Typography component="p" variant="body1" color="secondary" className={classes.subtitle}>Coming soon</Typography>
    </React.Fragment>
  );
}

export default Listen;