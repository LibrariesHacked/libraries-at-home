import React from 'react'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import Podcasts from './Podcasts'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  }
}))

function Listen () {
  const classes = useStyles()

  return (
    <>
      <Typography component='h1' variant='h3' color='secondary' className={classes.header}>Listen</Typography>
      <Typography component='p' variant='body1' className={classes.subtitle} gutterBottom>Hear what libraries are talking about</Typography>
      <Podcasts />
    </>
  )
}

export default Listen
