import React, { useEffect } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'

import { makeStyles } from '@material-ui/core/styles'

import AppHeader from './AppHeader'
import Footer from './Footer'
import Search from './Search'
import Watch from './Watch'
import Read from './Read'
import Listen from './Listen'
import MarkdownPage from './MarkdownPage'
import Notification from './Notification'

import About from './pages/about.md'
import Accessibility from './pages/accessibility.md'
import Data from './pages/data.md'
import Privacy from './pages/privacy.md'

import * as serviceHelper from './helpers/services'

import { useApplicationStateValue } from './context/applicationState'
import { useViewStateValue } from './context/viewState'
import { useSearchStateValue } from './context/searchState'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}))

function AtHomeApplication () {
  const [{ loadingServices, loadingVideos, loadingBlogs, loadingPostcode }, dispatchView] = useViewStateValue()
  const [{ }, dispatchApplication] = useApplicationStateValue() //eslint-disable-line
  const [{ }, dispatchSearch] = useSearchStateValue() //eslint-disable-line

  useEffect(() => {
    async function fetchServices () {
      dispatchView({ type: 'ToggleLoadingServices' })
      const servicesData = await serviceHelper.getServices()
      const serviceSystemNameLookup = {}
      servicesData.forEach(service => {
        serviceSystemNameLookup[service.systemName] = service
      })
      dispatchApplication({ type: 'AddServices', services: servicesData })
      dispatchView({ type: 'ToggleLoadingServices' })
      // Process any service query parameters
      const currentUrlParams = new URLSearchParams(window.location.search)
      const serviceName = currentUrlParams.get('service')
      if (serviceName && serviceSystemNameLookup[serviceName]) {
        const urlService = serviceSystemNameLookup[serviceName]
        dispatchSearch({ type: 'SetService', service: urlService })
      }
    }
    async function fetchVideos () {
      dispatchView({ type: 'ToggleLoadingVideos' })
      const videoData = await serviceHelper.getServicesYouTubeVideos()
      dispatchApplication({ type: 'AddVideos', videos: videoData })
      dispatchView({ type: 'ToggleLoadingVideos' })
    }
    async function fetchBlogs () {
      dispatchView({ type: 'ToggleLoadingBlogs' })
      const blogData = await serviceHelper.getServicesBlogs()
      dispatchApplication({ type: 'AddBlogs', blogs: blogData })
      dispatchView({ type: 'ToggleLoadingBlogs' })
    }
    fetchServices()
    fetchVideos()
    fetchBlogs()
  }, [dispatchApplication, dispatchView, dispatchSearch])

  const classes = useStyles()

  const loading = loadingServices || loadingVideos || loadingBlogs || loadingPostcode

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppHeader
          site={1}
          loading={loadingServices || loadingVideos || loadingBlogs}
        />
        {loading ? <LinearProgress variant='buffer' value={0} valueBuffer={0} color='secondary' /> : null}
        <Container maxWidth='lg'>
          <main className={classes.content}>
            <Route path='/' exact render={() => <Search />} />
            <Route path='/watch' exact render={() => <Watch />} />
            <Route path='/read' exact render={() => <Read />} />
            <Route path='/listen' exact render={() => <Listen />} />
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
        <Notification />
      </div>
    </BrowserRouter>
  )
}

export default AtHomeApplication
