import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import MovieIcon from '@material-ui/icons/MovieTwoTone';
import OpenInBrowser from '@material-ui/icons/OpenInBrowserTwoTone';
import PlaylistPlay from '@material-ui/icons/PlaylistPlayTwoTone';

import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

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
  const { videos } = props;
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

  return (
    <React.Fragment>
      <Typography component="h2" variant="h3" color="secondary" className={classes.subtitle}>Watch</Typography>
      {Object.keys(videos_bydate).map(date => {
        return <React.Fragment>
          <ListSubheader component="div" disableSticky>{moment(date).calendar(null, {
            lastDay: '[Yesterday]',
            sameDay: '[New Today]',
            nextDay: '[Tomorrow]',
            lastWeek: '[Last] dddd',
            nextWeek: 'dddd',
            sameElse: 'L'
          })}</ListSubheader>
          <Grid container spacing={3}>
            {videos_bydate[date].map((item, idx) => (
              <Grid
                key={'grd_vids_' + idx}
                item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Card className={classes.root} variant="outlined" className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={item.custom_elements[0]['media:group'][2]['media:thumbnail']._attr['url']}
                    title={item.title}
                  />
                  <CardContent className={classes.overlay}>
                    <Typography variant="small" component="p">{item.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" startIcon={<MovieIcon />} onClick={handlePlayVideo.bind(this, item.guid)}>Play</Button>
                    <Button size="small" color="primary" startIcon={<PlaylistPlay />}>Channel</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      })}
      <Dialog maxWidth="sm" onClose={handleCloseVideoDialog} aria-labelledby="YouTube dialog" open={dialog_open}>
        <iframe className={classes.video} width="560" height="315" src={video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </Dialog>
    </React.Fragment>
  );
}

export default Watch;