import React from 'react'

import Link from '@material-ui/core/Link'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ChevronRightIcon from '@material-ui/icons/ChevronRightTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import moment from 'moment'

import { useApplicationStateValue } from './context/applicationState'

const config = require('./helpers/config.json')

const useStyles = makeStyles((theme) => ({
  columnLink: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  },
  header: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  link: {
    display: 'inline'
  },
  linkText: {
    columnWidth: '16em'
  }
}))

function BlogPosts () {
  const [{ blogs }, dispatchApplication] = useApplicationStateValue() //eslint-disable-line
  const classes = useStyles()

  const blogsByDate = blogs.reduce(function (rv, x) {
    const datetime = new Date(x.date)
    const date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
    (rv[date] = rv[date] || []).push(x)
    return rv
  }, {})

  return (
    <>
      <Paper variant='outlined' className={classes.linkContainer}>
        <Typography component='h3' variant='h6' className={classes.header}>Recent library blogs</Typography>
        <Typography component='p' variant='body1' className={classes.linkText}>
          {Object.keys(blogsByDate).slice(0, 3).map((date, blgIdx) => {
            return (
              <React.Fragment key={'frg_blogdates_' + blgIdx}>
                <ListSubheader component='span' className={classes.columnLink}>{moment(date, 'YYYY-MM-DD').calendar(null, config.calendarDisplay)}</ListSubheader>
                <br />
                {blogsByDate[date].map((item, idx) => {
                  return (
                    <React.Fragment key={'typ_links_' + idx}>
                      <Typography component='span' className={classes.columnLink}>
                        <ChevronRightIcon />
                        <Link className={classes.link} key={'typ_link_' + idx} target='_blank' rel='noopener' href={item.url} variant='body1'>{item.title}</Link>
                      </Typography>
                      <br />
                    </React.Fragment>)
                })}
              </React.Fragment>
            )
          })}
        </Typography>
      </Paper>
    </>
  )
}

export default BlogPosts
