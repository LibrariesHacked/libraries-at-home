import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center'
  }
}));

function App() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h2" color="secondary" className={classes.subtitle}>Search</Typography>
    </React.Fragment>
  );
}

export default App;