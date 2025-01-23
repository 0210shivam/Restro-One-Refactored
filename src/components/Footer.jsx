import React from 'react';

const Footer = (props) => {
   const business = props?.business[0];

   return (
      <>
         <div className='footer_container'>
            <div className='text-white' style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : '#070E6A' }}>
               <footer className="text-center text-lg-start text-muted pt-1">
                  <section style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : '#070E6A', color: props.theme ? props.theme.secondary_text_color : 'white' }}>
                     <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                           <div className="col-md-5 col-lg-5 col-xl-3 mr-auto mb-4">
                              <h6 className="text-uppercase fw-bold mb-4">
                                 {business?.name}
                              </h6>
                              <p>
                                 <i className="fas fa-home me-3 mt-1" />
                                 {business?.address}
                                 <br />
                              </p>
                           </div>
                           <div className="col-md-4 col-lg-5 col-xl-3 mx-auto mb-md-0 mb-4">
                              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                              <p className='text-wrap' style={{ wordBreak: 'break-all' }}>
                                 <i className="fas fa-envelope me-3" />
                                 {business?.email}
                              </p>
                              <p>
                                 <i className="fas fa-phone me-3" /> {business?.phone}
                              </p>
                           </div>
                        </div>
                     </div>
                  </section>
                  <div
                     className="text-center p-2"
                     style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : '#070E6A', color: props.theme ? props.theme.secondary_text_color : 'white' }}
                  >
                  </div>
               </footer>
            </div>
         </div>
      </>
   );
};

export default Footer;
