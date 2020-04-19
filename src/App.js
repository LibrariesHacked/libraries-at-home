import React, { useState, useEffect } from 'react';

import { BrowserRouter, Link, Route } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import blueGrey from '@material-ui/core/colors/blueGrey';

import BookIcon from '@material-ui/icons/BookTwoTone';
import HeadsetIcon from '@material-ui/icons/HeadsetTwoTone';
import MovieIcon from '@material-ui/icons/MovieTwoTone';
import SearchIcon from '@material-ui/icons/SearchTwoTone';

import Footer from './Footer';
import Search from './Search';
import Watch from './Watch';
import Read from './Read';
import Listen from './Listen';

import * as serviceHelper from './helpers/services';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blueGrey
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'none'
      },
      root: {
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
    margin: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  title: {
    margin: theme.spacing(3)
  }
}));

function App() {

  const [loading_services, setLoadingServices] = useState(false);
  const [loading_videos, setLoadingVideos] = useState(false);
  const [loading_blogs, setLoadingBlogs] = useState(false);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [service, setService] = useState({});

  useEffect(() => {
    async function fetchServices() {
      setLoadingServices(true);
      const services_data = await serviceHelper.getServices();
      setServices(services_data);
      setLoadingServices(false);
    }
    async function fetchVideos() {
      setLoadingVideos(true);
      const video_data = await serviceHelper.getServicesYouTubeVideos();
      setVideos(video_data);
      setLoadingVideos(false);
    }
    async function fetchBlogs() {
      setLoadingBlogs(true);
      const blog_data = await serviceHelper.getServicesBlogs();
      setBlogs(blog_data);
      setLoadingBlogs(false);
    }
    fetchServices();
    fetchVideos();
    fetchBlogs();
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
          {loading_services || loading_videos ? <LinearProgress color="secondary" /> : null}
          <Container maxWidth="lg">
            <main className={classes.content}>
              <Route
                path='/'
                exact
                render={() => {
                  return <Search loading_services={loading_services} services={services} service={service} setService={setService} />
                }}
              />
              <Route
                path='/watch'
                exact
                render={() => {
                  return <Watch services={services} videos={videos} />
                }}
              />
              <Route
                path='/read'
                exact
                render={() => {
                  return <Read loading_blogs={loading_blogs} blogs={blogs} />
                }}
              />
              <Route
                path='/listen'
                exact
                render={() => {
                  return <Listen />
                }}
              />
            </main>
          </Container>
          <Container maxWidth="lg">
            <Footer />
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;