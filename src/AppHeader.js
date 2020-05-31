import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import BookIcon from '@material-ui/icons/BookTwoTone'
import HeadsetIcon from '@material-ui/icons/HeadsetTwoTone'
import MovieIcon from '@material-ui/icons/MovieTwoTone'
import SearchIcon from '@material-ui/icons/SearchTwoTone'

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: 'white'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  title: {
    margin: theme.spacing(2)
  }
}))

function AppHeader (props) {
  const { loadingServices, loadingVideos } = props
  const location = useLocation()
  const classes = useStyles()

  return (
    <>
      <Container maxWidth='lg'>
        <Typography color='textSecondary' variant='h6' component='h1' className={classes.title}>Libraries at home</Typography>
      </Container>
      <AppBar position='static' color='inherit' className={classes.appBar} elevation={0}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Button size='large' className={classes.button} component={Link} to='/' color={(location.pathname === '/' ? 'primary' : 'secondary')} onClick={() => { }} startIcon={<SearchIcon />}>Search</Button>
            <Button size='large' className={classes.button} component={Link} to='/watch' color={(location.pathname === '/watch' ? 'primary' : 'secondary')} onClick={() => { }} startIcon={<MovieIcon />}>Watch</Button>
            <Button size='large' className={classes.button} component={Link} to='/read' color={(location.pathname === '/read' ? 'primary' : 'secondary')} onClick={() => { }} startIcon={<BookIcon />}>Read</Button>
            <Button size='large' className={classes.button} component={Link} to='/listen' color={(location.pathname === '/listen' ? 'primary' : 'secondary')} onClick={() => { }} startIcon={<HeadsetIcon />}>Listen</Button>
          </Toolbar>
        </Container>
      </AppBar>
      {loadingServices || loadingVideos ? <LinearProgress color='secondary' /> : null}
    </>
  )
}

export default AppHeader
