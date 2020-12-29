import React from 'react'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import AndroidIcon from '@material-ui/icons/AndroidTwoTone'
import ComputerIcon from '@material-ui/icons/ComputerTwoTone'
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBusTwoTone'
import EventIcon from '@material-ui/icons/EventTwoTone'
import FindInPageIcon from '@material-ui/icons/FindInPageTwoTone'
import HomeIcon from '@material-ui/icons/HomeTwoTone'
import MicIcon from '@material-ui/icons/MicTwoTone'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowserTwoTone'
import PaymentIcon from '@material-ui/icons/PaymentTwoTone'
import WifiIcon from '@material-ui/icons/WifiTwoTone'

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

const linkIcons = {
  DirectionsBusIcon: DirectionsBusIcon,
  FindInPageIcon: FindInPageIcon,
  HomeIcon: HomeIcon,
  EventIcon: EventIcon,
  ComputerIcon: ComputerIcon,
  WifiIcon: WifiIcon,
  PaymentIcon: PaymentIcon,
  DescriptionIcon: DescriptionIcon,
  MicIcon: MicIcon
}

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: theme.typography.fontWeightBold
  },
  header: {
    textAlign: 'center'
  },
  root: {
    paddingTop: theme.spacing(2)
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  linkText: {
    columnWidth: '16em'
  },
  columnLink: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    padding: theme.spacing(1)
  },
  columnLinkIcon: {
    marginRight: theme.spacing(1)
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
            <Typography className={classes.header} component='h2' variant='h4' gutterBottom>{'Your library service is '}<span className={classes.bold}>{service.Name}</span></Typography>
            <div className={classes.social}>
              <ButtonGroup size='large' color='secondary' aria-label='Links to social media'>
                {config.services_text.social.filter(s => s.field in service).map((social, idx) => {
                  const IconName = socialIcons[social.icon]
                  return (
                    <Button
                      key={'icn_social_' + idx}
                      target='_blank'
                      href={social.url + service[social.field]}
                      title={social.title}
                      startIcon={<IconName />}
                    >
                      {social.title}
                    </Button>
                  )
                })}
              </ButtonGroup>
            </div>
            <Grid container spacing={3} className={classes.gridContainer}>
              {service['Android app URL'] || service['iOS app URL']
                ? (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <Alert severity='info' icon={false}>
                        <AlertTitle>Mobile application</AlertTitle>
                        Use the library on your phone <br />
                        {service['Android app URL'] ? <Button size='large' color='primary' className={classes.socialIcon} target='_blank' href={service['Android app URL']} title='App for Android' startIcon={<AndroidIcon />}>Android app</Button> : null}
                        {service['iOS app URL'] ? <Button size='large' color='primary' className={classes.socialIcon} target='_blank' href={service['iOS app URL']} title='App for iOS' startIcon={<AppleIcon />}>iOS app</Button> : null}
                      </Alert>
                    </Grid>
                  </>
                ) : null}
              {config.services_text.library_service.filter(s => s.field in service).map((library, idx) => {
                return (
                  <Grid key={'grd_service_' + idx} item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Alert severity='info' icon={false}>
                      <AlertTitle>{library.title.replace('[service]', service.Name)}</AlertTitle>
                      {library.description}<br />
                      <Button size='large' color='primary' startIcon={<OpenInBrowserIcon />} target='_blank' href={service[library.field]}>{library.link_text}</Button>
                    </Alert>
                  </Grid>
                )
              })}
            </Grid>
            <Typography component='p' className={classes.linkText}>
              {config.services_text.service_links.filter(s => s.field in service).map((link, idx) => {
                const IconName = linkIcons[link.icon]
                return (
                  <Typography key={'typ_links_' + idx} component='span' className={classes.columnLink}>
                    <IconName color='secondary' className={classes.columnLinkIcon} />
                    <Link key={'typ_link_' + idx} target='_blank' href={service[link.field]} variant='subtitle2'>{link.text}</Link>
                    <br />
                  </Typography>
                )
              })}
            </Typography>
          </>) : null}
    </div>
  )
}

export default Service
