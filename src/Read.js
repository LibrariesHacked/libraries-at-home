import React from 'react'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import BlogPosts from './BlogPosts'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center'
  }
}))

function Read (props) {
  const { loadingBlogs, blogs } = props

  const classes = useStyles()

  return (
    <>
      <Typography component='h2' variant='h6' className={classes.subtitle}>Read</Typography>
      <Typography component='p' variant='body1' className={classes.subtitle}>See what library services are writing</Typography>
      <BlogPosts loadingBlogs={loadingBlogs} blogs={blogs} />
    </>
  )
}

export default Read
