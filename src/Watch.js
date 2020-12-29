import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import ListSubheader from '@material-ui/core/ListSubheader'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import PlayIcon from '@material-ui/icons/PlayCircleOutlineTwoTone'
import PlaylistPlay from '@material-ui/icons/PlaylistPlayTwoTone'

import { makeStyles } from '@material-ui/core/styles'

import Rating from '@material-ui/lab/Rating'

import moment from 'moment'

import * as serviceHelper from './helpers/services'

import { useApplicationStateValue } from './context/applicationState'

const config = require('./helpers/config.json')

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center'
  },
  card: {
    position: 'relative'
  },
  media: {
    height: 150
  },
  overlay: {
    color: '#ffffff',
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%'
  },
  playIcon: {
    color: '#2e7d32'
  },
  rating: {
    marginLeft: theme.spacing(1)
  },
  video: {
    maxWidth: '100%'
  }
}))

function Watch () {
  const [{ videos, services }] = useApplicationStateValue() //eslint-disable-line
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  const handleCloseVideoDialog = () => {
    setDialogOpen(false)
    setVideoUrl('')
  }

  const handlePlayVideo = (videoId) => {
    setDialogOpen(true)
    setVideoUrl('https://www.youtube.com/embed/' + videoId.replace('yt:video:', ''))
  }

  const videosByDate = videos.reduce(function (rv, x) {
    const datetime = new Date(x.date)
    const date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
    (rv[date] = rv[date] || []).push(x)
    return rv
  }, {})

  const servicesByYoutubeId = {}
  services.forEach(service => {
    if (service['YouTube ID']) servicesByYoutubeId[service['YouTube ID']] = service
  })

  return (
    <>
      <Typography component='h1' variant='h3' color='secondary' className={classes.title}>Library TV</Typography>
      <Typography component='p' variant='body1' className={classes.title}>Watch videos published by library services on YouTube</Typography>
      {Object.keys(videosByDate).map((date, idx) => {
        return (
          <React.Fragment key={'frg_dates_' + idx}>
            <ListSubheader component='div' disableSticky>{moment(date, 'YYYY-MM-DD').calendar(null, config.calendarDisplay)}</ListSubheader>
            <Grid container spacing={3}>
              {videosByDate[date].map((item, idx) => {
                const customEls = item.custom_elements
                const mediaGroup = customEls.filter(x => Object.keys(x)[0] === 'media:group')[0]['media:group']
                const mediaThumbnail = mediaGroup.filter(x => Object.keys(x)[0] === 'media:thumbnail')[0]['media:thumbnail']
                const mediaCommunity = mediaGroup.filter(x => Object.keys(x)[0] === 'media:community')[0]['media:community']
                const mediaStarRating = mediaCommunity.filter(x => Object.keys(x)[0] === 'media:starrating')[0]['media:starrating']
                const rating = mediaStarRating._attr.average
                const channelId = customEls.filter(x => Object.keys(x)[0] === 'yt:channelid')[0]['yt:channelid']
                const service = servicesByYoutubeId[channelId]
                const serviceYtData = serviceHelper.getServiceYouTubeDataFromId(channelId)
                return (
                  <Grid
                    key={'grd_vids_' + idx}
                    item xs={12} sm={6} md={4} lg={4} xl={3}
                  >
                    <Card variant='outlined' className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={mediaThumbnail._attr.url}
                        title={item.title}
                      />
                      <CardContent className={classes.overlay}>
                        <Typography variant='caption' component='p'>{item.title}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size='small' className={classes.playIcon} startIcon={<PlayIcon />} onClick={handlePlayVideo.bind(this, item.guid)}>Play</Button>
                        {service ? <Button size='small' color='secondary' startIcon={<PlaylistPlay />} target='_blank' rel='noopener' href={serviceYtData.url}>{service.Name}</Button> : null}
                        {
                          mediaStarRating && rating && rating > 0
                            ? (
                              <Tooltip title={rating ? 'Rated ' + rating : 'No rating'} aria-label='add'>
                                <span><Rating size='small' className={classes.rating} name='read-only' value={rating} precision={0.5} readOnly /></span>
                              </Tooltip>
                            )
                            : null
                        }
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </React.Fragment>
        )
      })}
      <Dialog maxWidth='sm' onClose={handleCloseVideoDialog} aria-labelledby='YouTube dialog' open={dialogOpen}>
        <iframe title='Video' className={classes.video} width='560' height='315' src={videoUrl} frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' />
      </Dialog>
    </>
  )
}

export default Watch
