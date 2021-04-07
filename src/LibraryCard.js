import React from 'react'
import { withRouter } from 'react-router'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import UpdateIcon from '@material-ui/icons/UpdateTwoTone'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowserTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import { useApplicationStateValue } from './context/applicationState'
import { useSearchStateValue } from './context/searchState'

import * as urlHelper from './helpers/url'

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 4px'
  },
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: '2px solid #ffe0b2'
  },
  cardActions: {
    backgroundColor: '#fff3e0',
    color: '#388e3c'
  },
  libraryName: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

function LibraryCard (props) {
  const [{ services }] = useApplicationStateValue()
  const [{ library, service }, dispatchSearch] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  const changeService = (serviceName) => {
    const serviceMatch = services.filter(s => s.Name === serviceName)
    if (serviceMatch && serviceMatch.length === 1) {
      dispatchSearch({ type: 'SetService', service: serviceMatch[0] })
      urlHelper.addService(props.history, serviceMatch[0].systemName)
    }
  }

  const bull = <span className={classes.bullet}> • </span>
  const distance = library != null ? Math.round(library.distance / 1609) : null
  return (
    <div>
      {library != null ? (
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography component='h2' variant='h5'>Your nearest library is {distance} mile{distance !== 1 ? 's' : ''}</Typography>
            <Typography component='p' variant='h5'><span className={classes.libraryName}>{library.library_name}</span></Typography>
            <Typography variant='body2' component='p'>
              {[library.address_1, library.address_2, library.address_3, library.postcode].filter(a => a !== '').join(', ')}
              {bull}
              {library.local_authority}
              {library.colocated === 'Yes' && library.colocated_with !== null ? (bull + 'Colocated with ' + library.colocated_with) : ''}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button variant='text' size='large' color='secondary' startIcon={<OpenInBrowserIcon />} target='_blank' href={library.url}>Go to website</Button>
            {library.local_authority !== service.Name ? <Button variant='text' size='large' color='secondary' startIcon={<UpdateIcon />} onClick={() => changeService(library.local_authority)}>Use this library service</Button> : null}
          </CardActions>
        </Card>
      ) : null}
    </div>
  )
}

export default withRouter(LibraryCard)
