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

function MobileLibraryCard () {
  const [{ mobileLibrary }] = useSearchStateValue() //eslint-disable-line
  const classes = useStyles()

  useEffect(() => {

  }, [])

  const bull = <span className={classes.bullet}>•</span>

  return (
    <div>
      {mobileLibrary != null
        ? (
          <Card variant='outlined'>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>Nearest mobile library</Typography>
              <Typography variant='h5' component='h2'>
                {mobileLibrary.name}{bull}{mobileLibrary.community}
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {mobileLibrary.organisation_name}
              </Typography>
              <Typography variant='body2' component='p'>
                {mobileLibrary.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' color='primary'>View timetable</Button>
            </CardActions>
          </Card>
        ) : null}
    </div>
  )
}

export default MobileLibraryCard
