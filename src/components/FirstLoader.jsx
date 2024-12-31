import React from 'react';
import loaderVideo from '../../public/magicqrlogo.mp4';

const styles = {
   container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      overflow: 'hidden', // Ensure no overflow from the video
   },
   video: {
      width: 'auto', // Adjust width dynamically
      height: '100vh', // Force video to take full viewport height
      maxWidth: 'none', // Prevent limiting width to viewport
      maxHeight: 'none', // Prevent limiting height to viewport
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
