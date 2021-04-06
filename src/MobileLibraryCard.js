import React from 'react'
import { withRouter } from 'react-router'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import UpdateIcon from '@material-ui/icons/UpdateTwoTone'
import InsertInvitationIcon from '@material-ui/icons/InsertInvitationTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import { useApplicationStateValue } from './context/applicationState'
import { useSearchStateValue } from './context/searchState'

import * as urlHelper from './helpers/url'

import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: '2px solid #c8e6c9'
  },
  cardActions: {
    backgroundColor: '#e8f5e9',
    color: '#388e3c'
  },
  libraryName: {
    fontWeight: theme.typography.fontWeightBold
  },
  scheduleDate: {
    fontSize: '1.1em'
  }
}))

function MobileLibraryCard (props) {
  const [{ services }] = useApplicationStateValue()
  const [{ mobileLibrary, service }, dispatchSearch] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  const changeService = (serviceName) => {
    const serviceMatch = services.filter(s => s.Name === serviceName)
    if (serviceMatch && serviceMatch.length === 1) {
      dispatchSearch({ type: 'SetService', service: serviceMatch[0] })
      urlHelper.addService(props.history, serviceMatch[0].systemName)
    }
  }

  const distance = mobileLibrary != null ? Math.round(mobileLibrary.distance / 1609) : null
  return (
    <div>
      {mobileLibrary != null
        ? (
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <Typography component='h2' variant='h5'>{'Your nearest mobile stop is ' + distance + ' mile' + (distance > 1 ? 's' : '')}</Typography>
              <Typography component='p' variant='h5'><span className={classes.libraryName}>{mobileLibrary.name} in {mobileLibrary.community}</span></Typography>
              <Typography component='p' variant='body1'>
                {'Next visiting '}<span className={classes.scheduleDate}>{moment(mobileLibrary.route_schedule[0]).format('h:mma dddd Do MMMM')}</span>
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button variant='text' size='large' color='secondary' startIcon={<InsertInvitationIcon />} target='_blank' href={mobileLibrary.timetable}>Go to timetable</Button>
              {mobileLibrary.organisation_name !== service.Name ? <Button variant='text' size='large' color='primary' startIcon={<UpdateIcon />} onClick={() => changeService(mobileLibrary.organisation_name)}>Use this library service</Button> : null}
            </CardActions>
          </Card>
        ) : null}
    </div>
  )
}

export default withRouter(MobileLibraryCard)
