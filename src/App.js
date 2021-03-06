import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'

import lightBlue from '@material-ui/core/colors/lightBlue'
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
  service: {},
  currentServiceSystemName: null,
  library: null,
  mobileLibrary: null
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
        searchType: 'postcode',
        currentServiceSystemName: null
      }
    case 'SetService':
      return {
        ...state,
        service: action.service,
        currentServiceSystemName: action.service.systemName
      }
    case 'SetLocation':
      return {
        ...state,
        searchPosition: action.searchPosition
      }
    case 'SetLibrary':
      return {
        ...state,
        library: action.library
      }
    case 'SetMobileLibrary':
      return {
        ...state,
        mobileLibrary: action.mobileLibrary
      }
    case 'ClearAll':
      return {
        ...state,
        searchPostcode: '',
        searchPosition: [],
        searchType: '',
        service: {},
        currentServiceSystemName: null,
        library: null,
        mobileLibrary: null
      }
    default:
      return state
  }
}

const initialViewState = {
  notificationOpen: false,
  notificationSeverity: '',
  notificationMessage: '',
  loadingPostcode: false,
  loadingLocation: false,
  loadingServices: false,
  loadingVideos: false,
  loadingBlogs: false
}

const viewReducer = (state, action) => {
  switch (action.type) {
    case 'ShowNotification':
      return { ...state, notificationOpen: true, notificationSeverity: action.notificationSeverity, notificationMessage: action.notificationMessage }
    case 'CloseNotification':
      return { ...state, notificationOpen: false }
    case 'SetPostcodeSearch':
      return { ...state, loadingPostcode: false, mapPosition: action.mapPosition, mapZoom: [13] }
    case 'ToggleLoadingPostcode':
      return { ...state, loadingPostcode: !state.loadingPostcode }
    case 'ToggleLoadingLocation':
      return { ...state, loadingLocation: !state.loadingLocation }
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
      main: lightBlue[800]
    },
    secondary: {
      main: blueGrey[600]
    },
    outline: {
      main: blueGrey[50]
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
    MuiDivider: {
      root: {
        backgroundColor: blueGrey[50]
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
