import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import React from 'react';

const DialogPopUp = (props) => {

   return (
      <>
         <Dialog open={props.open} onClose={props.handleClose}>
            <IconButton
               aria-label="close"
               onClick={props.handleClose}
               sx={{
                  position: 'absolute',
                  right: 2,
                  top: 0,
                  zIndex: 5,
                  color: (theme) => theme.palette.grey[500],
               }}
            >
               <Close />
            </IconButton>
            <DialogContent sx={{ mt: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', maxWidth: '240px', minWidth: '240px' }}>
                  <img style={{ overflow: 'auto', borderRadius: '5px' }} src={`${props.img}?tr=w-240,h-240`} alt="product image" />
                  <br />
                  <div>
                     <h5 style={{ color: props.theme ? props.theme.primary_text_color : 'black' }}>{props.name}</h5>
                     {props.description !== "Null" ? <p style={{ fontSize: '12px', fontFamily: 'Poppins' }}>{props.description}</p> : null}
                     <h6 style={{ color: props.theme ? props.theme.primary_text_color : 'black', opacity: 0.5, fontSize: '12px', fontFamily: 'Poppins' }}>&#8377; {props.price}</h6>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default DialogPopUp;
