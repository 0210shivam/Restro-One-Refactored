import React, { useEffect } from 'react';

const Banners = (props) => {

   useEffect(() => {
      const carouselElement = document.getElementById('carouselExample');
      const carousel = new window.bootstrap.Carousel(carouselElement, {
         interval: 3400,
      });

      return () => {
         carousel.dispose();
      };
   }, []);

   return (
      <>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 px-0">
                  <div
                     id="carouselExample"
                     className="carousel slide"
                     data-bs-ride="carousel"
                     data-bs-interval="3400"
                  >
                     <div className="carousel-inner">
                        {props?.banners && props?.banners.length > 0 && props?.banners?.map((banner, index) => (
                           <div
                              key={index}
                              className={`carousel-item ${index === 0 ? 'active' : ''}`}
                              style={{ transition: 'transform 0.5s ease-in-out' }}
                           >
                              <img
                                 src={`${banner?.image}?tr=w-800,h-300`}
                                 className="d-block w-100 rounded"
                                 alt="..."
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Banners;
