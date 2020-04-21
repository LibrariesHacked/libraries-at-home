import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ChevronRightIcon from '@material-ui/icons/ChevronRightTwoTone';

import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

const config = require('./helpers/config.json');

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

function BlogPosts(props) {
  const { loading_blogs, blogs } = props;
  const classes = useStyles();

  const blogs_bydate = blogs.reduce(function (rv, x) {
    let datetime = new Date(x['date']);
    let date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
    (rv[date] = rv[date] || []).push(x);
    return rv;
  }, {});

  return (
    <React.Fragment>
      <Paper variant="outlined" className={classes.linkContainer}>
        <Typography component="h3" variant="h6" color="secondary" className={classes.header}>Recent library blogs</Typography>
        {loading_blogs ? <LinearProgress color="secondary" /> : null}
        <Typography component="p" variant="body1" className={classes.linkText}>
          {Object.keys(blogs_bydate).slice(0, 3).map((date, blg_idx) => {
            return <React.Fragment key={'frg_blogdates_' + blg_idx}>
              <ListSubheader component="span" className={classes.columnLink}>{moment(date, 'YYYY-MM-DD').calendar(null, config.calendar_display)}</ListSubheader>
              {blogs_bydate[date].map((item, idx) => {
                return <Typography key={'typ_links_' + idx} component="span" className={classes.columnLink}>
                  <ChevronRightIcon />
                  <Link key={'typ_link_' + idx} target="_blank" href={item.url} variant="body1">{item.title + ' (' + item.author + ')'}</Link>
                  <br />
                </Typography>
              })}
            </React.Fragment>
          })}
        </Typography>
      </Paper>
    </React.Fragment>
  );
}

export default BlogPosts;