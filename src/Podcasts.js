import React from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import MicIcon from '@material-ui/icons/MicTwoTone'

import { makeStyles } from '@material-ui/core/styles'

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

function Podcasts (props) {
  const { loadingServices, services } = props
  const classes = useStyles()

  return (
    <>
      <Paper variant='outlined' className={classes.linkContainer}>
        <Typography component='h3' variant='h6' className={classes.header}>Library podcasts</Typography>
        {loadingServices ? <LinearProgress color='primary' /> : null}
        <Typography component='p' variant='body1' className={classes.linkText}>
          {services.filter(s => s['Podcast URL'] && s['Podcast URL'] !== '').map((item, idx) => {
            return (
              <React.Fragment key={'frg_podcasts_' + idx}>
                <Typography component='span' className={classes.columnLink}>
                  <MicIcon />
                  <span>{item[config.podcasts.service_name_field]}.&nbsp;</span>
                  <Link className={classes.link} rel='noopener' target='_blank' href={item[config.podcasts.url_field]} variant='body1'>{item[config.podcasts.podcast_name_field]}</Link>
                </Typography>
                <br />
              </React.Fragment>)
          })}
        </Typography>
      </Paper>
    </>
  )
}

export default Podcasts
