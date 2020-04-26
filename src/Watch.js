import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import MovieIcon from '@material-ui/icons/MovieTwoTone';
import PlaylistPlay from '@material-ui/icons/PlaylistPlayTwoTone';

import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import * as serviceHelper from './helpers/services';

const config = require('./helpers/config.json');

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center'
  },
  card: {
    position: 'relative',
  },
  media: {
    height: 150
  },
  overlay: {
    fontWeight: 500,
    color: '#ffffff',
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%'
  },
  video: {
    maxWidth: '100%'
  }
}));

function Watch(props) {
  const { services, videos } = props;
  const [dialog_open, setDialogOpen] = useState(false);
  const [video_url, setVideoUrl] = useState('');

  const classes = useStyles();

  const handleCloseVideoDialog = () => {
    setDialogOpen(false);
    setVideoUrl('');
  };

  const handlePlayVideo = (video_id) => {
    setDialogOpen(true);
    setVideoUrl('https://www.youtube.com/embed/' + video_id.replace('yt:video:', ''));
  };

  const videos_bydate = videos.reduce(function (rv, x) {
    let datetime = new Date(x['date']);
    let date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
    (rv[date] = rv[date] || []).push(x);
    return rv;
  }, {});

  const services_byyoutubeid = {}
  services.forEach(service => {
    if (service['YouTube ID']) services_byyoutubeid[service['YouTube ID']] = service;
  });

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="secondary" className={classes.subtitle}>Library TV</Typography>
      <Typography component="p" variant="body1" color="secondary" className={classes.subtitle}>Watch videos published by library services on YouTube</Typography>
      {Object.keys(videos_bydate).map((date, idx) => {
        return <React.Fragment key={'frg_dates_' + idx}>
          <ListSubheader component="div" disableSticky>{moment(date, 'YYYY-MM-DD').calendar(null, config.calendar_display)}</ListSubheader>
          <Grid container spacing={3}>
            {videos_bydate[date].map((item, idx) => {
              const custom_els = item.custom_elements;
              const media_group = custom_els.filter(x => Object.keys(x)[0] === 'media:group')[0]['media:group'];
              const media_thumbnail = media_group.filter(x => Object.keys(x)[0] === 'media:thumbnail')[0]['media:thumbnail'];
              const channel_id = custom_els.filter(x => Object.keys(x)[0] === 'yt:channelid')[0]['yt:channelid'];
              const service = services_byyoutubeid[channel_id];
              const service_yt_data = serviceHelper.getServiceYouTubeDataFromId(channel_id);
              return <Grid
                key={'grd_vids_' + idx}
                item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Card variant="outlined" className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={media_thumbnail._attr['url']}
                    title={item.title}
                  />
                  <CardContent className={classes.overlay}>
                    <Typography variant="caption" component="p">{item.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" startIcon={<MovieIcon />} onClick={handlePlayVideo.bind(this, item.guid)}>Play</Button>
                    {service ? <Button size="small" color="primary" startIcon={<PlaylistPlay />} target="_blank" rel="noopener" href={service_yt_data.url}>{service_yt_data.type}</Button> : null}
                  </CardActions>
                </Card>
              </Grid>
            })}
          </Grid>
          <br />
        </React.Fragment>
      })}
      <Dialog maxWidth="sm" onClose={handleCloseVideoDialog} aria-labelledby="YouTube dialog" open={dialog_open}>
        <iframe title="Video" className={classes.video} width="560" height="315" src={video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </Dialog>
    </React.Fragment>
  );
}

export default Watch;