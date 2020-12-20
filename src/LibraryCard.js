import React, { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
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
  title: {
    fontSize: 14
  }
}))

function LibraryCard () {
  const [{ library }] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  useEffect(() => {

  }, [])

  return (
    <div>
      {library != null ? (
        <Card variant='outlined'>
          <CardContent>
            <Typography className={classes.title} color='textSecondary' gutterBottom>Nearest library</Typography>
            <Typography variant='h5' component='h2'>
              {library.library_name}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {library.local_authority}
            </Typography>
            <Typography variant='body2' component='p'>
              {[library.address_1, library.address_2, library.address_3, library.postcode].filter(a => a !== '').join(', ')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>View more on Library Map</Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  )
}

export default LibraryCard
