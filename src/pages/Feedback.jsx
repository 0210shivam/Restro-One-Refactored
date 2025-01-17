import React from 'react';
import { useBusiness } from '../context/BusinessContextProvider';
import { Link, useSearchParams } from 'react-router-dom';
import "../styles/links-theme.css";
import { Box, Stack, Typography, Container, CircularProgress, Dialog, DialogContent, Drawer, IconButton } from '@mui/material';
import Banners from '../components/Banners';
import isValidURL from '../global/url/isValidURL';
import isValidHostname from '../global/url/isValidHostname';
import ContactLinks from '../components/ContactLinks';
import magicQrImg from '../../public/magicqrpng.png';
import { ArticleRounded, Close, Download, DownloadOutlined, EmailRounded, LocalPhoneRounded, PlaceRounded } from '@mui/icons-material';
import SocialLinks from '../global/utils/LinkExport';
import FeedbackFrom from '../components/FeedbackForm';
import InitialFeedbackForm from '../components/InitialFeedbackForm';
import vcfDownload from '../utils/vcfDownload';
import { decrypt, encrypt } from '../utils/encryptId';

const Feedback = () => {
   const [searchParams] = useSearchParams();

   // Get values of m and id from search parameters
   const id = searchParams.get('id');

   const { businessData } = useBusiness();
   const theme = businessData.theme[0];
   const business = businessData.business[0];

   const [drawerOpen, setDrawerOpen] = React.useState(true);

   // Ensure pages is a safe array
   const pages = Array.isArray(businessData?.pages) ? businessData.pages.filter((l) => !l.card_id) : [];
   console.log("Pages", pages);

   const banners = businessData.banners;

   return (
      <>
         <Container className="theme-container">
            {/* Profile Section */}
            <Box className="profile-section">
               {
                  business?.image ? <img src={business.image} alt={`${business.name}-logo`} className="profile-image" /> : null
               }
            </Box>

            <Box className="banners-section">
               <Banners banners={banners} />
            </Box>

            <Typography variant="h5" className="profile-name">{business.name}</Typography>

            {/* Contact Info Section */}
            <Box className="contact-info-section">
               {business.phone && (
                  <Typography variant="body1" sx={{ color: theme ? theme.primary_text_color : "gray" }} className="contact-item">
                     <LocalPhoneRounded sx={{ color: theme ? theme.primary_theme_color : "gray" }} />
                     <a href={`tel:${business.phone}`}>{business.phone}</a>
                     {/* <DownloadOutlined onClick={() => vcfDownload({ phoneNumber: business.phone })} sx={{ color: theme ? theme.primary_theme_color : "gray" }} /> */}
                  </Typography>
               )}
               {business.email && (
                  <Typography variant="body1" sx={{ color: theme ? theme.primary_text_color : "gray" }} className="contact-item">
                     <EmailRounded sx={{ color: theme ? theme.primary_theme_color : "gray" }} />
                     <a href={`mailto:${business.email}`}>{business.email}</a>
                  </Typography>
               )}
               {business.address && (
                  <Typography variant="body1" sx={{ color: theme ? theme.primary_text_color : "gray" }} className="contact-item">
                     <PlaceRounded sx={{ color: theme ? theme.primary_theme_color : "gray" }} />
                     {business.address}
                  </Typography>
               )}
               {business.bio && (
                  <Typography textAlign="justify" variant="body1" sx={{ color: theme ? theme.primary_text_color : "gray" }} className="contact-item">
                     <ArticleRounded sx={{ color: theme ? theme.primary_theme_color : "gray", fontWeight: 'bolder' }} />
                     {business.bio}
                  </Typography>
               )}
            </Box>

            <br />
            <ContactLinks pages={pages} />
            <br />

            {/* Links Section */}
            <Stack className="links-section">
               <Link
                  onClick={() => vcfDownload({
                     phoneNumber: business?.phone,
                     name: business?.name,
                     email: business?.email,
                     address: business?.addrss,
                     city: business?.city,
                     pincode: business?.pincode
                  })}
                  className="link-item"
                  target='_blank'
                  style={{
                     backgroundColor: theme ? theme.primary_theme_color : '#f0f0f0',
                     color: theme ? theme.secondary_text_color : '#333',
                  }}
               >
                  <DownloadOutlined />
                  Contact Details
               </Link>
               {pages
                  .filter(link => link.status === "1" && link.type === "0" && !link.card_id && !SocialLinks.find((l) => l.page_title === link.page_title)) // Filter links with status "1"
                  .sort((a, b) => a.seq_no - b.seq_no) // Sort pageList based on seq_no
                  .map((link) => (
                     <Link
                        to={link.type === "5" ? `/feedback?page=${link.id}` : (isValidURL(link.link) && isValidHostname(link.link)) ? `https://${link.link}` : link.link}
                        key={link.id}
                        className="link-item"
                        target='_blank'
                        style={{
                           backgroundColor: theme ? theme.primary_theme_color : '#f0f0f0',
                           color: theme ? theme.secondary_text_color : '#333',
                        }}
                     >
                        {link.page_title}
                     </Link>
                  ))
               }
               {pages
                  .filter(link => +link.id !== +decrypt(id) && link.status === "1" && link.type === "5" && !link.card_id && !SocialLinks.find((l) => l.page_title === link.page_title)) // Filter links with status "1"
                  .sort((a, b) => a.seq_no - b.seq_no) // Sort pageList based on seq_no
                  .map((link) => (
                     <Link
                        to={link.type === "5" && `/feedback?id=${encrypt(link.id)}`}
                        key={link.id}
                        className="link-item"
                        // target='_blank'
                        style={{
                           backgroundColor: theme ? theme.primary_theme_color : '#f0f0f0',
                           color: theme ? theme.secondary_text_color : '#333',
                        }}
                     >
                        {link.page_title}
                     </Link>
                  ))
               }
            </Stack>

            <FeedbackFrom theme={theme} pages={pages} id={id} />

            {/* Footer Section */}
            <footer className="footer-section">
               <Typography variant="caption">
                  Powered by: <a href="https://magicqr.in" target="_blank" rel="noopener noreferrer">
                     <img style={{ height: '50px' }} src={magicQrImg} alt="magic-r" />
                  </a>
               </Typography>
               <Stack component="div" onClick={() => window.open("https://shop.magicqr.in", "_blank")} mt={2} sx={{ p: 1, cursor: 'pointer', border: !theme && "1px solid gray", backgroundColor: theme && theme.primary_theme_color, borderRadius: 2 }} direction="row" alignItems="center" justifyContent="center">
                  <Typography sx={{ color: theme && theme.secondary_text_color }} variant='body2'>Get Your Own MagicQR.</Typography>
               </Stack>
            </footer>
         </Container>
         <Drawer open={drawerOpen} anchor="bottom" onClose={() => setDrawerOpen(false)}>
            <div style={{ position: 'relative' }}>
               <Stack direction="row" width="100vw">
                  <Box sx={{ width: 0.4, backgroundColor: '#4285F4', padding: 0.5 }} />
                  <Box sx={{ width: 0.4, backgroundColor: '#34A853', padding: 0.5 }} />
                  <Box sx={{ width: 0.4, backgroundColor: '#FBBC05', padding: 0.5 }} />
                  <Box sx={{ width: 0.4, backgroundColor: '#EA4335', padding: 0.5 }} />
               </Stack>
               <IconButton
                  onClick={() => setDrawerOpen(false)}
                  style={{
                     position: 'absolute',
                     top: 20,
                     right: 8,
                     zIndex: 1,
                  }}
                  aria-label="close"
               >
                  <Close />
               </IconButton>
               <DialogContent>
                  <InitialFeedbackForm theme={theme} pages={pages} />
               </DialogContent>
            </div>
         </Drawer>
      </>
   );
};

export default Feedback;
