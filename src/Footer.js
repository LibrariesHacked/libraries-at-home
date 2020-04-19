import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    width: '100%'
  },
  grid: {
    marginTop: theme.spacing(2)
  },
  loveIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  footerText: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  }
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider />
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography variant="body1" color="secondary" className={classes.footerText}>LibrariesHacked. Built with <FavoriteIcon color="error" className={classes.loveIcon} /> for libraries.</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography variant="body1" color="secondary" className={classes.footerText}>Data compiled with thanks to @calire, @shedsue, @richardveevers</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;