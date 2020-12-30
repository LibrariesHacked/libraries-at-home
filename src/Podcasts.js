import React from 'react'

import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import MicIcon from '@material-ui/icons/MicTwoTone'

import { makeStyles } from '@material-ui/core/styles'

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
  linkContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  linkText: {
    columnWidth: '16em'
  },
  columnLinkIcon: {
    marginRight: theme.spacing(1)
  }
}))

function Podcasts () {
  const [{ services }, dispatchApplication] = useApplicationStateValue() //eslint-disable-line
  const classes = useStyles()

  return (
    <>
      <Typography component='h3' variant='h6' className={classes.header} gutterBottom>Library podcasts</Typography>
      <Typography component='p' className={classes.linkText}>
        {services.filter(s => s['Podcast URL'] && s['Podcast URL'] !== '').map((item, idx) => {
          return (
            <React.Fragment key={'frg_podcasts_' + idx}>
              <Typography component='span' className={classes.columnLink}>
                <MicIcon color='secondary' className={classes.columnLinkIcon} />
                <Link rel='noopener' target='_blank' href={item[config.podcasts.url_field]} variant='subtitle2'>{item[config.podcasts.service_name_field] + '. ' + item[config.podcasts.podcast_name_field]}</Link>
              </Typography>
              <br />
            </React.Fragment>)
        })}
      </Typography>
    </>
  )
}

export default Podcasts
