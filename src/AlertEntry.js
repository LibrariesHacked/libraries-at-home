import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { makeStyles } from '@material-ui/core/styles'

import ReactMarkdown from 'markdown-to-jsx'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  bullet: {
    margin: theme.spacing()
  },
  card: {
    border: '2px solid #b3e5fc'
  },
  cardHeader: {
    backgroundColor: '#e1f5fe'
  },
  service: {
    display: 'inline',
    fontWeight: 500
  }
}))

function AlertEntry (props) {
  const { service } = props
  const classes = useStyles()

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <ReactMarkdown className={classes.root}>
          {service['Library notification'] && service['Library notification'] !== '' ? service['Library notification'] : ''}
        </ReactMarkdown>
      </CardContent>
      <CardContent className={classes.cardHeader}>
        {service.Services ? service.Services.map((s, i) => {
          return <><Typography color='primary' className={classes.service} variant='body2'>{s}</Typography>{(i !== service.Services.length - 1 ? <span className={classes.bullet}> &#8226; </span> : null)}</>
        }) : null}
      </CardContent>
    </Card>
  )
}

export default AlertEntry
