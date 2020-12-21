import React, { useEffect } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import { useSearchStateValue } from './context/searchState'

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  card: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6)
  },
  libraryName: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

function LibraryCard () {
  const [{ library }] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  useEffect(() => {

  }, [])

  const bull = <span className={classes.bullet}> • </span>

  return (
    <div>
      {library != null ? (
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography component='h2' variant='h5'>{'Your nearest library is '}<span className={classes.libraryName}>{library.library_name}</span></Typography>
            <Typography variant='body2' component='p'>{Math.round(library.distance / 1609)} mile(s){bull}{[library.address_1, library.address_2, library.address_3, library.postcode].filter(a => a !== '').join(', ')}{bull}{library.local_authority}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export default LibraryCard
