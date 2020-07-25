import React from 'react'
import RouteLink from 'react-router-dom/Link'

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    width: '100%'
  },
  grid: {
    marginTop: theme.spacing(2)
  },
  loveIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  footerText: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  },
  footerRight: {
    textAlign: 'right'
  },
  tapTarget: {
    lineHeight: 2.2,
    fontSize: 16
  }
}))

function Footer () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Divider />
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='body1' className={classes.footerText}>Built by Libraries Hacked</Typography><br />
          <Typography variant='button'>
            <Link component={RouteLink} to='/about' title='About Libraries at home' className={classes.tapTarget}>About</Link><br />
            <Link component={RouteLink} to='/accessibility' title='How we make this site accessible' className={classes.tapTarget}>Accessibility</Link><br />
            <Link component={RouteLink} to='/privacy' title='Your privacy on this site' className={classes.tapTarget}>Privacy</Link><br />
            <Link component={RouteLink} to='/data' title='Data used on this site and licensing' className={classes.tapTarget}>Data</Link>
          </Typography>
        </Grid>
        <Grid className={classes.footerRight} item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='body1'>Data help from</Typography>
          <Typography variant='button'>
            <Link rel='noopener' target='_blank' href='https://twitter.com/calire' title='Claire' className={classes.tapTarget}>@calire</Link><br />
            <Link rel='noopener' target='_blank' href='https://twitter.com/shedsue' title='Sue' className={classes.tapTarget}>@shedsue</Link><br />
            <Link rel='noopener' target='_blank' href='https://twitter.com/richardveevers' title='Richard' className={classes.tapTarget}>@richardveevers</Link><br />
            <FavoriteIcon color='error' className={classes.loveIcon} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
