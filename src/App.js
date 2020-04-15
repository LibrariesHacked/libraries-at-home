import React from 'react';

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
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    margin: theme.spacing(3)
  }
}));

function App() {

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
                <Button size="large" component={Link} to="/" color="primary" onClick={() => { }}>Home</Button>
                <Button size="large" component={Link} to="/watch" color="primary" onClick={() => { }}>Watch</Button>
                <Button size="large" component={Link} to="/blogs" color="primary" onClick={() => { }}>Read</Button>
              </Toolbar>
            </Container>
          </AppBar>

          <Container maxWidth="lg">
            <main className={classes.content}>
              <Route
                path='/'
                exact
                render={() => {
                  return <div>Home</div>
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