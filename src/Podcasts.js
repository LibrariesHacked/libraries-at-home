import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ChevronRightIcon from '@material-ui/icons/ChevronRightTwoTone';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  columnLink: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  },
  header: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  linkText: {
    columnWidth: "16em"
  }
}));

function Podcasts(props) {
  const { loading_services, services } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper variant="outlined" className={classes.linkContainer}>
        <Typography component="h3" variant="h6" color="secondary" className={classes.header}>Library podcasts</Typography>
        {loading_services ? <LinearProgress color="secondary" /> : null}
        <Typography component="p" variant="body1" className={classes.linkText}>
          {services.filter(s => s['Podcast URL'] && s['Podcast URL'] !== '').map((item, idx) => {
            return (
              <React.Fragment key={'frg_podcasts_' + idx}>
                <Typography component="span" className={classes.columnLink}>
                  <ChevronRightIcon />
                  <Link key={'typ_link_' + idx} target="_blank" href={item['Podcast URL']} variant="body1">{item.Name}</Link>
                </Typography>
                <br />
              </React.Fragment>)
          })}

        </Typography>
      </Paper>
    </React.Fragment>
  );
}

export default Podcasts;