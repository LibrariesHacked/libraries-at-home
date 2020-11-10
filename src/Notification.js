import React from 'react'

import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { useViewStateValue } from './context/viewState'

function Alert (props) {
  return <MuiAlert elevation={0} variant='filled' {...props} />
}

function Notification () {
  const [{ notificationOpen, notificationSeverity, notificationMessage }, dispatchView] = useViewStateValue() //eslint-disable-line

  const handleClose = () => {
    dispatchView({ type: 'CloseNotification' })
  }

  return (
    <Snackbar
      open={notificationOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={notificationSeverity}>
        {notificationMessage}
      </Alert>
    </Snackbar>
  )
}

export default Notification
