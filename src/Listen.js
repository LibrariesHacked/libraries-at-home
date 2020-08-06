import React from 'react'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import Podcasts from './Podcasts'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    fontWeight: 700
  },
  subtitle: {
    textAlign: 'center'
  }
}))

function Listen () {
  const classes = useStyles()

  return (
    <>
      <Typography component='h2' variant='h5' className={classes.header}>Listen</Typography>
      <Typography component='p' variant='body1' className={classes.subtitle}>Beautiful noise</Typography>
      <Podcasts />
    </>
  )
}

export default Listen
