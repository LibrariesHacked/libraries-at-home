import React, { useEffect } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import { useSearchStateValue } from './context/searchState'

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px'
  },
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    border: '1px solid',
    borderColor: theme.palette.outline.main
  },
  libraryName: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

function MobileLibraryCard () {
  const [{ mobileLibrary }] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  useEffect(() => {

  }, [])

  const bull = <span className={classes.bullet}> • </span>

  return (
    <div>
      {mobileLibrary != null
        ? (
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <Typography component='h2' variant='h5'>{'Your nearest mobile library stop is '}<span className={classes.libraryName}>{mobileLibrary.name} in {mobileLibrary.community}</span></Typography>
              <Typography variant='body2' component='p'>{Math.round(mobileLibrary.distance / 1609)} mile(s){bull}{mobileLibrary.address}{bull}{mobileLibrary.organisation_name}</Typography>
            </CardContent>
          </Card>
        ) : null}
    </div>
  )
}

export default MobileLibraryCard
