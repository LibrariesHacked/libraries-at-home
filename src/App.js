import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'

import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { ApplicationStateProvider } from './context/applicationState'
import { SearchStateProvider } from './context/searchState'
import { ViewStateProvider } from './context/viewState'

import AtHomeApplication from './AtHomeApplication'

const initialApplicationState = {
  services: [],
  videos: [],
  blogs: []
}

const applicationReducer = (state, action) => {
  switch (action.type) {
    case 'AddServices':
      return {
        ...state,
        services: action.services
      }
    case 'AddVideos':
      return {
        ...state,
        videos: action.videos
      }
    case 'AddBlogs':
      return {
        ...state,
        blogs: action.blogs
      }
    default:
      return state
  }
}

const initialSearchState = {
  searchPostcode: '',
  searchType: '',
  searchDistance: 1609,
  searchPosition: [],
  service: {}
}

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SetSearchDistance':
      return {
        ...state,
        searchDistance: action.searchDistance
      }
    case 'SetPostcodeSearch':
      return {
        ...state,
        searchPostcode: action.searchPostcode,
        searchPosition: action.searchPosition,
        searchType: 'postcode'
      }
    case 'SetService':
      return {
        ...state,
        service: action.service
      }
    case 'ClearAll':
      return {
        ...state,
        searchPostcode: '',
        searchPosition: [],
        searchType: '',
        service: {}
      }
    default:
      return state
  }
}

const initialViewState = {
  notificationOpen: false,
  notificationMessage: '',
  loadingPostcode: false,
  loadingServices: false,
  loadingVideos: false,
  loadingBlogs: false
}

const viewReducer = (state, action) => {
  switch (action.type) {
    case 'SetNotificationMessage':
      return { ...state, notificationMessage: action.notificationMessage }
    case 'SetNotification':
      return { ...state, notificationOpen: action.notificationOpen }
    case 'ShowNotification':
      return { ...state, notificationOpen: true, notificationMessage: action.notificationMessage }
    case 'SetPostcodeSearch':
      return { ...state, loadingPostcode: false, mapPosition: action.mapPosition, mapZoom: [13] }
    case 'ToggleLoadingPostcode':
      return { ...state, loadingPostcode: !state.loadingPostcode }
    case 'ToggleLoadingServices':
      return { ...state, loadingServices: !state.loadingServices }
    case 'ToggleLoadingVideos':
      return { ...state, loadingVideos: !state.loadingVideos }
    case 'ToggleLoadingBlogs':
      return { ...state, loadingBlogs: !state.loadingBlogs }
    default:
      return state
  }
}

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

function App () {
  return (
    <ApplicationStateProvider initialState={initialApplicationState} reducer={applicationReducer}>
      <SearchStateProvider initialState={initialSearchState} reducer={searchReducer}>
        <ViewStateProvider initialState={initialViewState} reducer={viewReducer}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AtHomeApplication />
          </ThemeProvider>
        </ViewStateProvider>
      </SearchStateProvider>
    </ApplicationStateProvider>
  )
}

export default App
