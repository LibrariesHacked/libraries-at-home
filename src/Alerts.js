import React, { useState } from 'react'

import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonCheckedTwoTone'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUncheckedTwoTone'

import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'

import AlertEntry from './AlertEntry'

import { useApplicationStateValue } from './context/applicationState'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1)
  },
  filters: {
    alignContent: 'center',
    textAlign: 'center',
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(1)
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  header: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold
  },
  search: {
    position: 'relative',
    border: '1px solid #E0E0E0',
    borderColor: theme.palette.outline.main,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.8),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.9)
    },
    marginLeft: 0,
    marginRight: theme.spacing(),
    display: 'flex',
    maxWidth: 240
  }
}))

function Alerts () {
  const [{ services }, dispatchApplication] = useApplicationStateValue() //eslint-disable-line
  const [searchTerm, setSearchTerm] = useState('')
  const [servicesAvailable, setServicesAvailable] = useState({ 'Click and collect': false, 'Computer use': false, 'Home library service': false, 'Mobile library': false, Browsing: false })
  const classes = useStyles()

  const toggleServiceAvailable = (service) => {
    setServicesAvailable({ ...servicesAvailable, [service]: !servicesAvailable[service] })
  }

  return (
    <>
      <Typography component='h1' variant='h3' color='secondary' className={classes.header}>Alerts</Typography>
      <Typography component='p' variant='body1' className={classes.subtitle} gutterBottom>Current alerts for UK library services</Typography>
      <div className={classes.filters}>
        <div className={classes.search}>
          <InputBase
            placeholder='Search alerts'
            classes={{
              input: classes.inputInput
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ 'aria-label': 'filter alerts' }}
          />
        </div>
      </div>
      <div className={classes.filters}>
        {
          Object.keys(servicesAvailable).map((service, idx) => {
            return (
              <Badge
                key={'chp_' + idx}
                color='primary'
                badgeContent={services.filter(s => (s.Services && s.Services.indexOf(service) !== -1)).length}
                max={250}
                className={classes.chip}
              >
                <Chip
                  color={servicesAvailable[service] ? 'primary' : 'default'}
                  label={service}
                  onClick={() => { toggleServiceAvailable(service) }}
                  icon={servicesAvailable[service] ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                />
              </Badge>
            )
          })
        }
      </div>
      <Grid container spacing={3} className={classes.gridContainer}>
        {services
          .sort((a, b) => a.Name.localeCompare(b.Name))
          .filter(service => service['Library notification'] && service['Library notification'] !== '' && service['Library notification'] !== '\n')
          .filter(service => (searchTerm === '' || (service.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || service['Library notification'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)))
          .filter(service => {
            let display = true
            Object.keys(servicesAvailable).forEach(s => {
              if (servicesAvailable[s] && (!service.Services || service.Services.indexOf(s) === -1)) display = false
            })
            return display
          })
          .map((service, idx) => {
            return (
              <Grid key={'al_' + idx} item xs={12} sm={6} md={4} lg={4} xl={4}>
                <AlertEntry service={service} />
              </Grid>
            )
          })}
      </Grid>
    </>
  )
}

export default Alerts
