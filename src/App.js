import React, { useState, useEffect } from 'react';

import { BrowserRouter, Link, Route } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blueGrey from '@material-ui/core/colors/blueGrey';

import SearchIcon from '@material-ui/icons/SearchTwoTone';
import MovieIcon from '@material-ui/icons/MovieTwoTone';
import BookIcon from '@material-ui/icons/BookTwoTone';
import HeadsetIcon from '@material-ui/icons/HeadsetTwoTone';

import Search from './Search';
import Watch from './Watch';

import * as services from './helpers/services';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blueGrey
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'none'
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none'
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(3)
  }
}));

function App() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const videos = await services.getServicesYouTubeVideos();
      setVideos(videos);
    }
    fetchVideos();
  }, []);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography color="secondary" variant="h4" component="h1" className={classes.title}>Libraries at home</Typography>
          </Container>
          <AppBar position="static" color="default" elevation={0}>
            <Container maxWidth="lg">
              <Toolbar>
                <Button size="large" className={classes.button} component={Link} to="/" color="primary" onClick={() => { }} startIcon={<SearchIcon />}>Search</Button>
                <Button size="large" className={classes.button} component={Link} to="/watch" color="primary" onClick={() => { }} startIcon={<MovieIcon />}>Watch</Button>
                <Button size="large" className={classes.button} component={Link} to="/read" color="primary" onClick={() => { }} startIcon={<BookIcon />}>Read</Button>
                <Button size="large" className={classes.button} component={Link} to="/listen" color="primary" onClick={() => { }} startIcon={<HeadsetIcon />}>Listen</Button>
              </Toolbar>
            </Container>
          </AppBar>

          <Container maxWidth="lg">
            <main className={classes.content}>
              <Route
                path='/'
                exact
                render={() => {
                  return <Search />
                }}
              />
              <Route
                path='/watch'
                exact
                render={() => {
                  return <Watch videos={videos} />
                }}
              />
            </main>
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;