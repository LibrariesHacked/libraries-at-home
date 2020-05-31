import React from 'react'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import Podcasts from './Podcasts'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center'
  }
}))

function Listen (props) {
  const classes = useStyles()

  return (
    <>
      <Typography component='h2' variant='h6' color='secondary' className={classes.subtitle}>Listen</Typography>
      <Typography component='p' variant='body1' color='secondary' className={classes.subtitle}>Beautiful noise</Typography>
      <Podcasts loading_blogs={props.loading_blogs} services={props.services} />
    </>
  )
}

export default Listen
