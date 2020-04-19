import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import OpenInNewIcon from '@material-ui/icons/OpenInNewTwoTone';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const config = require('./helpers/config.json');

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  serviceName: {
    fontWeight: 500
  },
  leadButton: {
    marginTop: theme.spacing(1)
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3)
  },
  linkText: {

  }
}));

function Service(props) {
  const { service } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5" color="secondary">{'Your local library service is '}<span className={classes.serviceName}>{service.Name}</span></Typography>
      <br />
      <Grid container spacing={3}>
        {config.services_text.library_service.filter(s => s.field in service).map((library, idx) => {
          return <Grid key={'grd_service_' + idx} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Alert severity="info">
              <AlertTitle>{library.title.replace('[service]', service.Name)}</AlertTitle>
              {library.description}<br />
              <Button className={classes.leadButton} variant="outlined" size="large" color="primary" startIcon={<OpenInNewIcon />} target="_blank" href={service[library.field]}>{library.link_text}</Button>
            </Alert>
          </Grid>
        })}
      </Grid>
      <Paper variant="outlined" className={classes.linkContainer}>
        <Typography component="h3" variant="h6" color="secondary">Useful links</Typography>
        <Typography component="p" variant="body1" className={classes.linkText}>
        {config.services_text.service_links.filter(s => s.field in service).map((link, idx) => {
          return <React.Fragment>
            <Link key={'typ_link_' + idx} href={service[link.field]} variant="body1">{link.text}</Link><br />
          </React.Fragment>
        })}
        </Typography>
      </Paper>
    </div>
  );
}

export default Service;