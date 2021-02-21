import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import io from 'socket.io-client';

import styles from './VideoPlayer.module.css';

const socket = io('http://localhost:5000');

const VideoPlayer = (): JSX.Element => {
  const [searchVideoId, setSearchVideoId] = useState('');
  const [videoId, setVideoId] = useState('dyRsYk0LyA8');
  const [videoPlayer, setVideoPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // socket.on('all-time-change', (time: string) => {
    //   videoPlayer?.seekTo(Number(time));
    // });


    socket.on('all-play', (time: string) => {
      console.log('I don\'t know why, I don\'t want to know why, but it only works with console.log');
      if (videoPlayer !== null) {
        videoPlayer.playVideo();
        videoPlayer.seekTo(Number(time));
      }
    });

    socket.on('all-pause', (time: string) => {
      console.log('I don\'t know why, I don\'t want to know why, but it only works with console.log');
      if(videoPlayer !== null) {
        videoPlayer.pauseVideo();
        videoPlayer.seekTo(Number(time));
      }
    });
  }, []);

  // useEffect(() => {
  //   socket.on('new-operations', ({editorId, ops}: {editorId: string, ops: string}) => {

  //   })
  // })

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      controls: 0 as const,
      autoplay: 1 as const,
      disablekb: 1 as const,
      fs: 0 as const,
      modestbranding: 1 as const,
    }
  };

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const onReady = (e: any): void => {
    setVideoPlayer(e.target);
    e.target.playVideo();
  };

  const onPause = (e: any) => {
    videoPlayer.pauseVideo();
    socket.emit('pause', videoPlayer.getCurrentTime());
  };

  const onPlay = (e: any) => {
    videoPlayer.playVideo();
    socket.emit('play', videoPlayer.getCurrentTime());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    setVideoId(searchVideoId);
    event.preventDefault();
  };

  const handleChange = (event: any) => {
    setVideoPlayer(event.target);
    socket.emit('time-change', event.target.getCurrentTime());
  };

  const handleSlideStop = (event: any) => {
    console.log(event);
  };

  return (
    <div>
      <Form inline onSubmit={handleSubmit}>
        <div className={styles.input}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
            <Input name="videoid" placeholder="Input Video ID" value={searchVideoId}
              onChange={e => setSearchVideoId(e.target.value)}/>
            <Button color="success" type="submit">Play Video!</Button>
          </FormGroup>
        </div>
      </Form>
      <Youtube 
        className={styles.video}
        videoId={videoId}
        // onPlay={onPlay}
        // onPause={onPause}
        onReady={onReady}
        opts={opts}
      />
      <Button onClick={onPlay}>Play</Button>
      <Button onClick={onPause}>Pause</Button>
    </div>
  );
};

export default VideoPlayer;