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
  bullet: {
    margin: theme.spacing(2)
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
          <Typography variant='button'>
            <Link href='https://www.librarylab.uk/libraries-at-home' target='_blank' title='About the library lab projects and documentation for this project' className={classes.tapTarget}>About this project</Link>
            <span className={classes.bullet}>&#8226;</span>
            <Link component={RouteLink} to='/accessibility' title='How we make this site accessible' className={classes.tapTarget}>Accessibility</Link>
            <span className={classes.bullet}>&#8226;</span>
            <Link component={RouteLink} to='/privacy' title='Your privacy on this site' className={classes.tapTarget}>Privacy</Link>
            <span className={classes.bullet}>&#8226;</span>
            <Link component={RouteLink} to='/data' title='Data used on this site and licensing' className={classes.tapTarget}>Data</Link>
            <span className={classes.bullet}>&#8226;</span>
            <Link href='https://github.com/LibrariesHacked/libraries-at-home' target='_blank' title='Project on GitHub' className={classes.tapTarget}>GitHub</Link>
          </Typography><br />
          <Typography variant='body2' className={classes.footerText}>A Library Lab project by Libraries Hacked.</Typography>
        </Grid>
        <Grid className={classes.footerRight} item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='body2'>Data help from</Typography>
          <Typography variant='button'>
            <Link rel='noopener' target='_blank' href='https://twitter.com/calire' title='Claire' className={classes.tapTarget}>@calire</Link>
            <span className={classes.bullet}>&#8226;</span>
            <Link rel='noopener' target='_blank' href='https://twitter.com/shedsue' title='Sue' className={classes.tapTarget}>@shedsue</Link>
            <span className={classes.bullet}>&#8226;</span>
            <Link rel='noopener' target='_blank' href='https://twitter.com/richardveevers' title='Richard' className={classes.tapTarget}>@richardveevers</Link><br />
            <FavoriteIcon color='error' className={classes.loveIcon} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
