import React from 'react'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import PostcodeSearch from './PostcodeSearch'
import Service from './Service'

const useStyles = makeStyles((theme) => ({
  search: {
    alignContent: 'center',
    textAlign: 'center',
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '5px'
  },
  title: {
    textAlign: 'center'
  }
}))

function Search () {
  const classes = useStyles()
  return (
    <>
      <Typography component='h2' variant='h6' color='secondary' className={classes.title}>Your library service</Typography>
      <Typography component='p' variant='body1' className={classes.subtitle}>Search by postcode to find library services in your area</Typography>
      <div className={classes.search}>
        <PostcodeSearch settings={false} />
      </div>
      <Service />
    </>
  )
}

export default Search
