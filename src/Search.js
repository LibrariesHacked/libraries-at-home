import React from 'react'

import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import LibraryCard from './LibraryCard'
import MobileLibraryCard from './MobileLibraryCard'
import PostcodeSearch from './PostcodeSearch'
import Service from './Service'
import ServiceFilter from './ServiceFilter'

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
      <Typography component='p' variant='body1' className={classes.subtitle}>Search by postcode to find the library service in your area</Typography>
      <div className={classes.search}>
        <PostcodeSearch settings={false} />
      </div>
      <div className={classes.search}>
        <ServiceFilter />
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <LibraryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <MobileLibraryCard />
        </Grid>
      </Grid>
      <Service />
    </>
  )
}

export default Search
