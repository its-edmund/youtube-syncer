import React from 'react';

import DefaultNavbar from './components/DefaultNavbar';
import styles from './App.module.css';
import VideoPlayer from './components/VideoPlayer';

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <DefaultNavbar />
      <div className={styles.video}>
        <VideoPlayer />
      </div>
    </div>
  );
}

export default App;
