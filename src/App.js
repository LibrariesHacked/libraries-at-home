import React, { useState, useEffect } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'

import AppHeader from './AppHeader'
import Footer from './Footer'
import Search from './Search'
import Watch from './Watch'
import Read from './Read'
import Listen from './Listen'
import MarkdownPage from './MarkdownPage'

import About from './pages/about.md'
import Accessibility from './pages/accessibility.md'
import Data from './pages/data.md'
import Privacy from './pages/privacy.md'

import * as serviceHelper from './helpers/services'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800]
    },
    secondary: {
      main: blueGrey[600]
    }
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
    MuiTypography: {
      button: {
        textTransform: 'none'
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none'
      }
    }
  }
})

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}))

function App () {
  const [loadingServices, setLoadingServices] = useState(false)
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [loadingBlogs, setLoadingBlogs] = useState(false)
  const [videos, setVideos] = useState([])
  const [blogs, setBlogs] = useState([])
  const [services, setServices] = useState([])
  const [service, setService] = useState({})

  useEffect(() => {
    async function fetchServices () {
      setLoadingServices(true)
      const servicesData = await serviceHelper.getServices()
      setServices(servicesData)
      setLoadingServices(false)
    }
    async function fetchVideos () {
      setLoadingVideos(true)
      const videoData = await serviceHelper.getServicesYouTubeVideos()
      setVideos(videoData)
      setLoadingVideos(false)
    }
    async function fetchBlogs () {
      setLoadingBlogs(true)
      const blogData = await serviceHelper.getServicesBlogs()
      setBlogs(blogData)
      setLoadingBlogs(false)
    }
    fetchServices()
    fetchVideos()
    fetchBlogs()
  }, [])

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppHeader
            loading={loadingServices || loadingVideos}
          />
          <Container maxWidth='lg'>
            <main className={classes.content}>
              <Route path='/' exact render={() => <Search loadingServices={loadingServices} services={services} service={service} setService={setService} />} />
              <Route path='/watch' exact render={() => <Watch services={services} videos={videos} />} />
              <Route path='/read' exact render={() => <Read loadingBlogs={loadingBlogs} blogs={blogs} />} />
              <Route path='/listen' exact render={() => <Listen loadingServices={loadingServices} services={services} />} />
              <Route path='/about' exact render={() => <MarkdownPage page={About} />} />
              <Route path='/accessibility' exact render={() => <MarkdownPage page={Accessibility} />} />
              <Route path='/data' exact render={() => <MarkdownPage page={Data} />} />
              <Route path='/privacy' exact render={() => <MarkdownPage page={Privacy} />} />
              <Route path={['/http:', '/https:']} component={props => { window.location.replace(props.location.pathname.substr(1)); return null }} />
            </main>
          </Container>
          <Container maxWidth='lg'>
            <Footer />
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
