import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import styles from './VideoPlayer.module.css';

const VideoPlayer = (): JSX.Element => {
  const [searchVideoId, setSearchVideoId] = useState('');
  const [videoId, setVideoId] = useState('dyRsYk0LyA8');
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    console.log(currentTime);
  }, [currentTime]);

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

  const _onReady = (e: any): void => {
    e.target.playVideo();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    setVideoId(searchVideoId);
    event.preventDefault();
  };

  const handleChange = (event: any) => {
    setCurrentTime(event.target.getCurrentTime());
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
        onReady={_onReady}
        opts={opts}
        onStateChange={handleChange}
      />
    </div>
  );
};

export default VideoPlayer;