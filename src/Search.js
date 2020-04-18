import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  search: {
    alignContent: 'center',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  }
}));

function Search() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h3" color="secondary" className={classes.subtitle}>Search</Typography>
      <div className={classes.search}>
        <TextField
          label="Postcode"
          id="txt_postcode"
          defaultValue=""
          className={classes.textField}
          helperText="Enter your postcode"
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button variant="outlined" color="primary">Go</Button>
      </div>
    </React.Fragment>
  );
}

export default Search;