import React from 'react'

import Chip from '@material-ui/core/Chip'

import AlertTitle from '@material-ui/lab/AlertTitle'
import Alert from '@material-ui/lab/Alert'

import { makeStyles } from '@material-ui/core/styles'

import ReactMarkdown from 'markdown-to-jsx'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: 'white'
  }
}))

function AlertEntry (props) {
  const { service } = props
  const classes = useStyles()

  return (
    <Alert severity='warning' className={classes.alert}>
      <AlertTitle>{service.Name}</AlertTitle>
      {service.Services ? service.Services.map((s, i) => <Chip key={i} variant='outlined' size='small' className={classes.chip} label={s} />) : null}
      <ReactMarkdown className={classes.root}>
        {service['Library notification'] && service['Library notification'] !== '' ? service['Library notification'] : ''}
      </ReactMarkdown>
    </Alert>
  )
}

export default AlertEntry
