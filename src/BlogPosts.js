import React from 'react'

import Link from '@material-ui/core/Link'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'

import ArticleIcon from '@material-ui/icons/DescriptionTwoTone'

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
    textAlign: 'center'
  },
  linkText: {
    columnWidth: '16em'
  },
  columnLinkIcon: {
    marginRight: theme.spacing(1)
  }
}))

function BlogPosts () {
  const [{ blogs }] = useApplicationStateValue() //eslint-disable-line
  const classes = useStyles()

  const blogsByDate = blogs.reduce(function (rv, x) {
    const datetime = new Date(x.date)
    const date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
    (rv[date] = rv[date] || []).push(x)
    return rv
  }, {})

  return (
    <>
      <Typography component='h3' variant='h6' className={classes.header} gutterBottom>Recent blogs</Typography>
      <Typography component='p' className={classes.linkText}>
        {Object.keys(blogsByDate).slice(0, 3).map((date, blgIdx) => {
          return (
            <React.Fragment key={'frg_blogdates_' + blgIdx}>
              <ListSubheader disableSticky component='span' className={classes.columnLink}>{moment(date, 'YYYY-MM-DD').calendar(null, config.calendarDisplay)}</ListSubheader>
              <br />
              {blogsByDate[date].map((item, idx) => {
                return (
                  <React.Fragment key={'typ_links_' + idx}>
                    <Typography component='span' className={classes.columnLink}>
                      <ArticleIcon color='secondary' className={classes.columnLinkIcon} />
                      <Link key={'typ_link_' + idx} target='_blank' rel='noopener' href={item.url} variant='subtitle2'>{item.author + '. ' + item.title}</Link>
                    </Typography>
                    <br />
                  </React.Fragment>)
              })}
            </React.Fragment>
          )
        })}
      </Typography>
    </>
  )
}

export default BlogPosts
