import { WhatsApp } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContextProvider';
// import LoginForm from './LoginForm';

const Header = (props) => {
   const router = useNavigate();
   const { businessData } = useBusiness();
   const path = window.location.pathname;
   const [openLoginForm, setOpenLoginForm] = useState(false);

   return (
      <>
         <div>
            <div className="container-fluid px-0">
               <nav className="navbar navbar-expand-lg updated-navbar">
                  <div className="container">
                     <Link to='/' className="navbar-brand">
                        {
                           props?.business?.image ? <img
                              style={{ height: '50px' }}
                              src={props?.business?.image ? props?.business?.image : props?.business?.image}
                              className="card-img-top"
                              alt="..."
                           /> : props?.business?.name ? <Typography className="text-center" variant="h4">{props?.business?.name}</Typography> : "E-menu"
                        }
                     </Link>
                     <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="ms-auto d-lg-flex align-items-center">
                           {
                              props?.settings?.pages_status === "1" && props?.pages.length > 0 && props?.pages
                                 .sort((a, b) => a.seq_no - b.seq_no) // Sort pageList based on seq_no
                                 .map((l) => (
                                    <div key={l.id} onClick={() => {
                                       l.link ? window.location.href = l.link : navigate({ pathname: '/page', search: `?id=${l.id}` });
                                    }}
                                       className="me-3" // Bootstrap margin-end for spacing
                                       style={{ color: props.theme ? props.theme.secondary_text_color : 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                                       {l?.page_title}
                                    </div>
                                 ))
                           }
                           {
                              props?.categories && props?.categories.length > 0 && props?.categories[0]?.product_details.length > 0 ?
                                 <div onClick={() => router("/")} className="me-3" style={{ color: props.theme ? props.theme.primary_theme_color : 'white', fontWeight: 'bold', cursor: 'pointer' }}>E-Menu</div> : null
                           }
                           <div onClick={() => router("/feedback")} className="me-3" style={{ color: props.theme ? props.theme.primary_theme_color : 'white', fontWeight: 'bold', cursor: 'pointer' }}>Feedback</div>
                           <div onClick={() => router("/contact")} className="me-3" style={{ color: props.theme ? props.theme.primary_theme_color : 'white', fontWeight: 'bold', cursor: 'pointer' }}>Contact</div>
                           {/* {
                              businessData.isAuthenticated ?
                                 <div onClick={() => router("/profile")} className="me-3" style={{ color: props.theme ? props.theme.secondary_text_color : 'white', fontWeight: 'bold', cursor: 'pointer' }}>Profile</div> :
                                 path !== "/checkout" ?
                                    <div onClick={() => setOpenLoginForm(true)} className="me-3" style={{ color: props.theme ? props.theme.secondary_text_color : 'white', fontWeight: 'bold', cursor: 'pointer' }}>Login</div> : null
                           } */}
                        </div>
                     </div>
                     <div className='d-block d-lg-none'>
                        <Stack sx={{ zIndex: '1000' }} direction="row">
                           <a target='_blank' href={`https://api.whatsapp.com/send/?phone=${props?.business?.phone}&text=hello`}>
                              <IconButton sx={{ color: "green", zIndex: '1000' }}>
                                 <WhatsApp color="green" />
                              </IconButton>
                           </a>
                           {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                           </button> */}
                        </Stack>
                     </div>
                  </div>
               </nav>
            </div>
         </div>
         {/* <LoginForm open={openLoginForm} handleClose={() => setOpenLoginForm(false)} /> */}
      </>
   );
};

export default Header;
