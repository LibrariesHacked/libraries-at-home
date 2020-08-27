import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import AndroidIcon from '@material-ui/icons/AndroidTwoTone'
import OpenInNewIcon from '@material-ui/icons/OpenInNewTwoTone'
import ChevronRightIcon from '@material-ui/icons/ChevronRightTwoTone'

import InstagramIcon from 'mdi-material-ui/Instagram'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import AppleIcon from 'mdi-material-ui/AppleIos'

import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

import { useSearchStateValue } from './context/searchState'

const config = require('./helpers/config.json')

const socialIcons = {
  InstagramIcon: InstagramIcon,
  FacebookIcon: FacebookIcon,
  TwitterIcon: TwitterIcon
}

const useStyles = makeStyles((theme) => ({
  alertTitle: {
  },
  centerHeader: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: 'center'
  },
  header: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: 'center'
  },
  socialHeader: {
    textAlign: 'center'
  },
  appsHeader: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  root: {
    paddingTop: theme.spacing(2)
  },
  serviceName: {
    fontWeight: theme.typography.fontWeightBold
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  apps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialIcon: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    background: '#ffffff'
  },
  appsIcon: {
    margin: theme.spacing(1)
  },
  leadButton: {
    marginTop: theme.spacing(1)
  },
  linkContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  linkText: {
    columnWidth: '16em'
  },
  columnLink: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  }
}))

function Service () {
  const [{ service }, dispatchSearch] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {service && Object.keys(service).length > 0
        ? (
          <>
            <Typography className={classes.centerHeader} component='h2' variant='h5'>{'Your library service is '}<span className={classes.serviceName}>{service.Name}</span></Typography>
            <div className={classes.social}>
              {config.services_text.social.filter(s => s.field in service).map((social, idx) => {
                const IconName = socialIcons[social.icon]
                return (
                  <IconButton
                    style={
                      { color: social.colour }
                    }
                    key={'icn_social_' + idx}
                    component='a'
                    className={classes.socialIcon}
                    target='_blank'
                    href={social.url + service[social.field]}
                    title={social.title}
                  >
                    <IconName />
                  </IconButton>
                )
              })}
            </div>
            <Grid container spacing={3}>
              {config.services_text.library_service.filter(s => s.field in service).map((library, idx) => {
                return (
                  <Grid key={'grd_service_' + idx} item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Alert severity='info'>
                      <AlertTitle className={classes.alertTitle}>{library.title.replace('[service]', service.Name)}</AlertTitle>
                      {library.description}<br />
                      <Button className={classes.leadButton} size='large' color='primary' startIcon={<OpenInNewIcon />} target='_blank' href={service[library.field]}>{library.link_text}</Button>
                    </Alert>
                  </Grid>
                )
              })}
            </Grid>
            <Paper elevation={0} className={classes.linkContainer}>
              <Typography component='h3' variant='h6' className={classes.header}>Useful links</Typography>
              <Typography component='p' variant='body1' className={classes.linkText}>
                {config.services_text.service_links.filter(s => s.field in service).map((link, idx) => {
                  return (
                    <Typography key={'typ_links_' + idx} component='span' className={classes.columnLink}>
                      <ChevronRightIcon color='secondary' />
                      <Link key={'typ_link_' + idx} target='_blank' href={service[link.field]} variant='body1'>{link.text}</Link>
                      <br />
                    </Typography>
                  )
                })}
              </Typography>
            </Paper>
            {service['Android app URL'] || service['iOS app URL']
              ? (
                <>
                  <Typography className={classes.appsHeader} component='h3' variant='h6'>Use the library on your phone</Typography>
                  <div className={classes.apps}>
                    {service['Android app URL'] ? <IconButton color='secondary' component='a' className={classes.socialIcon} target='_blank' href={service['Android app URL']} title='Library app for Android'><AndroidIcon /></IconButton> : null}
                    {service['iOS app URL'] ? <IconButton color='secondary' component='a' className={classes.socialIcon} target='_blank' href={service['iOS app URL']} title='Library app for iOS'><AppleIcon /></IconButton> : null}
                  </div>
                </>
              ) : null}
          </>) : null}
    </div>
  )
}

export default Service
