import React from 'react';
import loaderVideo from '../../public/magicqrlogo.mp4';

const styles = {
   container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000', // Optional, set background color while loading
   },
   video: {
      width: '100%',
      height: 'auto',
      maxWidth: '100vw',
      maxHeight: '100vh',
   },
};

const FirstLoader = () => {
   return (
      <div style={styles.container}>
         <video
            style={styles.video}
            src={loaderVideo}
            autoPlay
            loop
            muted
         />
      </div>
   );
};

export default FirstLoader;
