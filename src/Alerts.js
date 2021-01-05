import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'

import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'

import AlertEntry from './AlertEntry'

import { useApplicationStateValue } from './context/applicationState'

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles()

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
      <Grid container spacing={3} className={classes.gridContainer}>
        {services
          .filter(service => service['Library notification'])
          .filter(service => (searchTerm === '' || (service.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || service['Library notification'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)))
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
