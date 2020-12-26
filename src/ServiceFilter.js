import React, { useState } from 'react'
import { withRouter } from 'react-router'

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'

import BusinessIcon from '@material-ui/icons/BusinessTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import { useApplicationStateValue } from './context/applicationState'
import { useSearchStateValue } from './context/searchState'
import { useViewStateValue } from './context/viewState'

import * as urlHelper from './helpers/url'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1)
  },
  chip: {
    marginRight: theme.spacing(1)
  }
}))

function ServiceFilter (props) {
  const [{ services }] = useApplicationStateValue()
  const [{ service }, dispatchSearch] = useSearchStateValue()
  const [{ }, dispatchView] = useViewStateValue()//eslint-disable-line

  const [serviceMenuAnchor, setServiceMenuAnchor] = useState(null)

  const openServiceMenu = (element) => setServiceMenuAnchor(element)

  const closeServiceMenu = () => setServiceMenuAnchor(null)

  const chooseService = (service) => {
    dispatchSearch({ type: 'SetService', service: service })
    urlHelper.addService(props.history, service.systemName)
    closeServiceMenu()
  }

  const clearServiceFilter = () => {
    dispatchSearch({ type: 'ClearAll' })
    urlHelper.clearService(props.history)
  }

  const classes = useStyles()

  return (
    <>
      {Object.keys(service).length === 0 ? (
        <Tooltip title='Choose library service'>
          <Button size='large' color='primary' className={classes.button} onClick={(e) => openServiceMenu(e.currentTarget)} startIcon={<BusinessIcon />}>
            Choose service
          </Button>
        </Tooltip>
      ) : <Chip size='medium' className={classes.chip} color='primary' onDelete={clearServiceFilter} label={service.Name} />}
      <Menu
        id='menu-library-service'
        anchorEl={serviceMenuAnchor}
        keepMounted
        open={Boolean(serviceMenuAnchor)}
        onClose={() => closeServiceMenu()}
      >
        {
          services
            .filter((s) => s && s.Name)
            .sort((a, b) => a.Name.localeCompare(b.Name))
            .map(s => {
              return <MenuItem key={'mnu_itm_org_' + s.Code} onClick={() => chooseService(s)}>{s.Name}</MenuItem>
            })
        }
      </Menu>
    </>
  )
}

export default withRouter(ServiceFilter)
