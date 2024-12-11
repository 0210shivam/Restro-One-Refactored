import React from 'react';
import '../assets/css/loader.css';

const InitialLoader = () => {
   return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: '500' }}>
         <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
         </div>
      </div>
   );
};

export default InitialLoader;
