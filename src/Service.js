import React from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import OpenInNewIcon from '@material-ui/icons/OpenInNewTwoTone';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const config = require('./helpers/config.json');

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '20px'
  }
}));

function Service(props) {
  const { service } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6" color="secondary" className={classes.subtitle}>{'Your local library service is ' + service.Name}</Typography>
      <br />
      <Grid container spacing={3}>
        {config.services_text.library_service.map((library, idx) => {
          return <Grid key={'grd_usingurls_' + idx} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Alert severity="info">
              <AlertTitle>{library.title.replace('[service]', service.Name)}</AlertTitle>
              {library.description}<br />
              <Button color="secondary" startIcon={<OpenInNewIcon />} target="_blank" href={service[library.field]}>{library.link_text}</Button>
            </Alert>
          </Grid>
        })}
      </Grid>
    </div>
  );
}

export default Service;