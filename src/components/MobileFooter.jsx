import { Call, RestaurantMenuOutlined, ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MobileFooter = (props) => {
   const [open, setOpen] = useState(false);

   useEffect(() => {
      const p = props.categories && props.categories.length > 0 ? true : false;

      if (p) {
         setOpen(true);
      }
   }, [props.categories]);

   return (
      <div>
         <AppBar position="fixed" sx={{ zIndex: '999', top: 'auto', bottom: 0, bgcolor: props.theme.id ? props.theme.primary_theme_color : '#dcdffd', color: 'white' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
               {open ? <Stack sx={{ textDecoration: 'none', color: props.theme ? props.theme.secondary_text_color : 'white' }} component={Link} to={`/`} display="flex" flexDirection="column">
                  <IconButton color={props.theme.secondary_text_color ? "inherit" : "black"}>
                     <RestaurantMenuOutlined />
                     <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px' }} variant="h6" ml={1}>
                        Digital Menu
                     </Typography>
                  </IconButton>
               </Stack> : null}
               <Stack sx={{ textDecoration: 'none', color: props.theme ? props.theme.secondary_text_color : 'white' }} component={Link} to="/" display="flex" flexDirection="column">
                  <IconButton color={props.theme.secondary_text_color ? "inherit" : "black"}>
                     <ThumbUpAlt />
                     <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px' }} variant="h6" ml={1}>
                        Magic Link
                     </Typography>
                  </IconButton>
               </Stack>
               {/* <Stack sx={{ textDecoration: 'none', color: props.theme ? props.theme.secondary_text_color : 'white' }} component={Link} to="/contact" display="flex" flexDirection="column">
                  <IconButton color={props.theme.secondary_text_color ? "inherit" : "black"}>
                     <Call />
                     <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px' }} variant="h6" ml={1}>
                        Contact
                     </Typography>
                  </IconButton>
               </Stack> */}
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default MobileFooter;
