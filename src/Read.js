import React from 'react'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import BlogPosts from './BlogPosts'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  }
}))

function Read () {
  const classes = useStyles()

  return (
    <>
      <Typography component='h2' variant='h6' color='secondary' className={classes.header}>Read</Typography>
      <Typography component='p' variant='body1' className={classes.subtitle}>The things library services are writing</Typography>
      <BlogPosts />
    </>
  )
}

export default Read
