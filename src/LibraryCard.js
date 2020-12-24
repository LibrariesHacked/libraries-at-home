import React, { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowserTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import { useSearchStateValue } from './context/searchState'
import { CardActions } from '@material-ui/core'

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

function LibraryCard () {
  const [{ library }] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  useEffect(() => {

  }, [])

  const bull = <span className={classes.bullet}> • </span>

  const distance = library != null ? Math.round(library.distance / 1609) : null
  return (
    <div>
      {library != null ? (
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography component='h2' variant='h5'>{'Your nearest library is '}<span className={classes.libraryName}>{library.library_name}</span></Typography>
            <Typography variant='body2' component='p'>
              {distance} mile{distance > 1 ? 's' : ''}
              {bull}
              {[library.address_1, library.address_2, library.address_3, library.postcode].filter(a => a !== '').join(', ')}
              {bull}
              {library.local_authority}
              {library.colocated === 'Yes' && library.colocated_with !== null ? (bull + 'Colocated with ' + library.colocated_with) : ''}
            </Typography>
            <CardActions>
              <Button variant='text' size='large' color='primary' startIcon={<OpenInBrowserIcon />} target='_blank' href={library.url}>Go to website</Button>
            </CardActions>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export default LibraryCard
