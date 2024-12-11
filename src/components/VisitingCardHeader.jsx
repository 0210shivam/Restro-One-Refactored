import React from 'react';
import { useNavigate } from 'react-router-dom';

const VisitingCardHeader = (props) => {
   const router = useNavigate();

   return (
      <>
         <div className="container-fluid px-0">
            <nav className="navbar updated-navbar">
               <div className="container justify-content-center mb-2">
                  <div className="d-flex justify-content-center align-items-center justify-content-lg-between">
                     {
                        props?.settings?.pages_status === "1" && props.pages.length > 0 && props.pages
                           .sort((a, b) => a.seq_no - b.seq_no) // Sort pageList based on seq_no
                           .map((p) => (
                              <button key={p.id} onClick={() => window.location.href = p?.link} className='btn' style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : 'blue', color: props.theme ? props.theme.secondary_text_color : 'white', marginRight: '5px', border: props.theme?.primary_theme_color ? "none" : '1px solid grey' }}>
                                 {p?.page_title}
                              </button>
                           ))
                     }
                     {
                        props?.settings?.store_status === "1" && open ? <button onClick={() => router("/")} className='btn' style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : 'blue', color: props.theme ? props.theme.secondary_text_color : 'white', marginRight: '5px', border: props.theme?.primary_theme_color ? "none" : '1px solid grey' }}>E-Menu</button> : null
                     }
                     <button onClick={() => router("/feedback")} className='btn' style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : 'blue', color: props.theme ? props.theme.secondary_text_color : 'white', marginRight: '5px', border: props.theme?.primary_theme_color ? "none" : '1px solid grey' }}>Feedback</button>
                     <button onClick={() => router("/contact")} className='btn' style={{ backgroundColor: props.theme ? props.theme.primary_theme_color : 'blue', color: props.theme ? props.theme.secondary_text_color : 'white', marginRight: '5px', border: props.theme?.primary_theme_color ? "none" : '1px solid grey' }}>Contact</button>
                  </div>
               </div>
            </nav>
         </div>
      </>
   );
};

export default VisitingCardHeader;
