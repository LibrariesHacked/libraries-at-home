import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import FaceIcon from '@material-ui/icons/FaceTwoTone'
import AndroidIcon from '@material-ui/icons/AndroidTwoTone'
import GroupIcon from '@material-ui/icons/GroupTwoTone'
import ComputerIcon from '@material-ui/icons/ComputerTwoTone'
import DescriptionIcon from '@material-ui/icons/DescriptionTwoTone'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBusTwoTone'
import EventIcon from '@material-ui/icons/EventTwoTone'
import ExploreIcon from '@material-ui/icons/ExploreTwoTone'
import FindInPageIcon from '@material-ui/icons/FindInPageTwoTone'
import HomeIcon from '@material-ui/icons/HomeTwoTone'
import MicIcon from '@material-ui/icons/MicTwoTone'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowserTwoTone'
import PaymentIcon from '@material-ui/icons/PaymentTwoTone'
import SmartphoneIcon from '@material-ui/icons/SmartphoneTwoTone'
import TabletMacIcon from '@material-ui/icons/TabletMacTwoTone'
import WifiIcon from '@material-ui/icons/WifiTwoTone'

import InstagramIcon from 'mdi-material-ui/Instagram'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import AppleIcon from 'mdi-material-ui/AppleIos'

import AlertEntry from './AlertEntry'

import { useSearchStateValue } from './context/searchState'

const config = require('./helpers/config.json')

const socialIcons = {
  InstagramIcon: InstagramIcon,
  FacebookIcon: FacebookIcon,
  TwitterIcon: TwitterIcon
}

const linkIcons = {
  FaceIcon: FaceIcon,
  GroupIcon: GroupIcon,
  ComputerIcon: ComputerIcon,
  DescriptionIcon: DescriptionIcon,
  DirectionsBusIcon: DirectionsBusIcon,
  EventIcon: EventIcon,
  ExploreIcon: ExploreIcon,
  FindInPageIcon: FindInPageIcon,
  HomeIcon: HomeIcon,
  MicIcon: MicIcon,
  OpenInBrowserIcon: OpenInBrowserIcon,
  PaymentIcon: PaymentIcon,
  TabletMacIcon: TabletMacIcon,
  WifiIcon: WifiIcon
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: '#fff',
    backgroundColor: green[500]
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold
  },
  card: {
    border: '1px solid',
    borderColor: theme.palette.outline.main
  },
  cardTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1rem'
  },
  cardSubTitle: {
    fontSize: '1rem'
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
  const [{ service }] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {service && Object.keys(service).length > 0
        ? (
          <>
            <Typography className={classes.header} component='h2' variant='h4' gutterBottom>{'Your library service is '}<span className={classes.bold}>{service.Name}</span></Typography>
            {
              service['Library notification'] ? <AlertEntry service={service} /> : null
            }
            <div className={classes.social}>
              <ButtonGroup size='large' color='secondary' aria-label='Links to social media'>
                {config.services_text.social.filter(s => s.field in service).map((social, idx) => {
                  const IconName = socialIcons[social.icon]
                  return (
                    <Button
                      key={'icn_social_' + idx}
                      target='_blank'
                      rel='noopener'
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
                      <Card elevation={0} className={classes.card}>
                        <CardHeader
                          avatar={
                            <Avatar className={classes.avatar}><SmartphoneIcon /></Avatar>
                          }
                          title='Mobile application'
                          titleTypographyProps={{
                            className: classes.cardTitle
                          }}
                          subheader='Use the library on your phone'
                          subheaderTypographyProps={{
                            className: classes.cardSubTitle
                          }}
                        />
                        <CardActions disableSpacing>
                          {service['Android app URL'] ? <Button size='large' color='primary' className={classes.socialIcon} target='_blank' rel='noopener' href={service['Android app URL']} title='App for Android' startIcon={<AndroidIcon />}>Android app</Button> : null}
                          {service['iOS app URL'] ? <Button size='large' color='primary' className={classes.socialIcon} target='_blank' rel='noopener' href={service['iOS app URL']} title='App for iOS' startIcon={<AppleIcon />}>iOS app</Button> : null}
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                ) : null}
              {config.services_text.library_service.filter(s => s.field in service).map((library, idx) => {
                const IconName = linkIcons[library.icon]
                return (
                  <Grid key={'grd_service_' + idx} item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Card elevation={0} className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar className={classes.avatar}><IconName /></Avatar>
                        }
                        title={library.title.replace('[service]', service.Name)}
                        titleTypographyProps={{
                          className: classes.cardTitle
                        }}
                        subheader={library.description}
                        subheaderTypographyProps={{
                          className: classes.cardSubTitle
                        }}
                      />
                      <CardActions disableSpacing>
                        <Button size='large' color='primary' startIcon={<OpenInBrowserIcon />} target='_blank' rel='noopener' href={service[library.field]}>{library.link_text}</Button>
                      </CardActions>
                    </Card>
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
                    <Link key={'typ_link_' + idx} target='_blank' rel='noopener' href={service[link.field]} variant='subtitle2'>{link.text}</Link>
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
