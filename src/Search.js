import React, { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import SearchIcon from '@material-ui/icons/SearchTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import Service from './Service'

import * as postcodeHelper from './helpers/postcodes'

const useStyles = makeStyles((theme) => ({
  search: {
    alignContent: 'center',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    backgroundColor: 'white'
  }
}))

function Search (props) {
  const { loading_services, services, service, setService } = props
  const [loading_postcode, setloadingPostcode] = useState(false)
  const [postcode, setPostcode] = useState('')
  const [error_message, setErrorMessage] = useState('')

  const classes = useStyles()

  const validatePostcode = (pc) => /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(pc)

  const handlePostcodeSearch = async () => {
    setloadingPostcode(true)
    if (validatePostcode(postcode.trim())) {
      const service = await postcodeHelper.getServiceDataFromPostcode(postcode.trim(), services)
      setService(service)
    } else {
      setErrorMessage('Is that a UK postcode?')
    }
    setloadingPostcode(false)
  }

  const handlePostcodeChange = (e) => {
    const val = e.target.value.toUpperCase()
    if (error_message !== '' && validatePostcode(val.trim())) setErrorMessage('')
    setPostcode(val)
  }

  return (
    <>
      <Typography component='h2' variant='h6' color='secondary' className={classes.subtitle}>Library services</Typography>
      <Typography component='p' variant='body1' color='secondary' className={classes.subtitle}>Start by finding your local library service</Typography>
      <div className={classes.search}>
        <TextField
          error={error_message !== ''}
          label='Postcode'
          id='txt_postcode'
          className={classes.textField}
          margin='normal'
          variant='outlined'
          value={postcode}
          onChange={handlePostcodeChange}
          helperText={error_message}
          InputProps={{
            endAdornment: (<InputAdornment position='end'>
              <IconButton
                disabled={loading_services || loading_postcode}
                aria-label='search for postcode'
                onClick={handlePostcodeSearch}
              >
                <SearchIcon color='primary' />
              </IconButton>
                           </InputAdornment>)
          }}
        />
      </div>
      {loading_postcode ? <LinearProgress color='secondary' /> : null}
      {Object.keys(service).length > 0
        ? <div>
          <Service service={service} />
        </div>
        : null}
    </>
  )
}

export default Search
