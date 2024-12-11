import { Box } from '@mui/material';
import React from 'react';

const TopLook = (props) => {
   const handleEmailClick = (email) => {
      window.location.href = `mailto:${email}`;
   };

   const handleCallClick = (phoneNumber) => {
      window.location.href = `tel:${phoneNumber}`;
   };

   const handleWhatsAppClick = (phoneNumber) => {
      window.location.href = `https://wa.me/${phoneNumber}`;
   };

   const handleMouseEnter = (e, sColor) => {
      e.target.style.transform = 'scale(1.1)'; // Scale up on hover
      e.target.style.boxShadow = `0 2px 10px ${sColor}`; // Add box shadow
      e.target.querySelector('i').style.animation = 'shake 0.5s ease'; // Start shaking animation
   };

   const handleMouseLeave = (e) => {
      e.target.style.transform = 'scale(1)'; // Reset scale on mouse leave
      e.target.style.boxShadow = 'none'; // Remove box shadow
      e.target.querySelector('i').style.animation = 'none'; // Stop shaking animation
   };

   return (
      <>
         <img
            src={props.businessLogo}
            style={{
               width: '180px',
               objectFit: 'contain',
            }}
         />
         <br />
         <div className='container text-center'>
            <div className="row justify-content-center">
               <div className="col-8 col-md-3">
                  <div className="row">
                     <div className="col d-flex align-items-center justify-content-center">
                        <div onClick={() => handleCallClick(props.phone)} style={{
                           width: '50px',
                           height: '50px',
                           border: '2px solid orange', // Border style
                           borderRadius: '50%',
                           fontSize: '24px',
                           cursor: 'pointer',
                           color: 'orange',
                           transition: 'transform 0.3s', // Transition for scaling
                           zIndex: '5'
                        }}
                           onMouseEnter={(e, sColor) => handleMouseEnter(e, 'orange')}
                           onMouseLeave={(e) => handleMouseLeave(e)}
                           className='d-flex flex-column justify-content-center align-items-center'>
                           <i className="fa-solid fa-phone" style={{ transition: 'transform 0.5s', pointerEvents: 'none' }}></i>
                        </div>
                     </div>
                     <div className="col d-flex align-items-center justify-content-center">
                        {/* Mail Component */}
                        <div onClick={() => handleEmailClick(props.email)} style={{
                           width: '50px',
                           height: '50px',
                           border: '2px solid purple', // Border style
                           borderRadius: '50%',
                           fontSize: '24px',
                           cursor: 'pointer',
                           color: 'purple',
                           transition: 'transform 0.3s', // Transition for scaling
                           zIndex: '5'
                        }}
                           onMouseEnter={(e, sColor) => handleMouseEnter(e, "purple")}
                           onMouseLeave={(e) => handleMouseLeave(e)}
                           className='d-flex flex-column justify-content-center align-items-center'>
                           <i className="fa-solid fa-envelope" style={{ transition: 'transform 0.5s', pointerEvents: 'none' }}></i>
                        </div>
                     </div>
                     <div className="col d-flex align-items-center justify-content-center">
                        {/* WhatsApp Component */}
                        <div onClick={() => handleWhatsAppClick(props.phone)} style={{
                           width: '50px',
                           height: '50px',
                           border: '2px solid green', // Border style
                           borderRadius: '50%',
                           fontSize: '24px',
                           cursor: 'pointer',
                           color: 'green',
                           transition: 'transform 0.3s', // Transition for scaling
                           backgroundColor: 'transparent'
                        }}
                           onMouseEnter={(e, sColor) => handleMouseEnter(e, "green")}
                           onMouseLeave={(e) => handleMouseLeave(e)}
                           className='d-flex flex-column justify-content-center align-items-center'>
                           <i className="fa-brands fa-whatsapp" style={{ transition: 'transform 0.5s', pointerEvents: 'none' }}></i>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <br />

         <Box className='d-flex justify-content-center align-items-center ps-1'>
            <h3 style={{ color: props.theme ? props.theme.primary_theme_color : 'blue', textAlign: 'center' }}>{props.company_name}</h3>
         </Box>
      </>
   );
};

export default TopLook;
