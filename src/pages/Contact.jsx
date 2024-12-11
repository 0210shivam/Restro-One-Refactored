import React from 'react';
import { useBusiness } from '../context/BusinessContextProvider';
import { Link } from 'react-router-dom';
import "../styles/links-theme.css";
import { Box, Stack, Typography, Container, CircularProgress } from '@mui/material';
import Banners from '../components/Banners';
import isValidURL from '../global/url/isValidURL';
import isValidHostname from '../global/url/isValidHostname';
import ContactLinks from '../components/ContactLinks';
import magicQrImg from '../../public/magicqrpng.png';
import { ArticleRounded, EmailRounded, LocalPhoneRounded, PlaceRounded } from '@mui/icons-material';
import SocialLinks from '../global/utils/LinkExport';
import FeedbackFrom from '../components/FeedbackForm';

const Contact = () => {
   const { businessData, isReady } = useBusiness();
   const theme = businessData.theme[0];
   const business = businessData.business[0];

   // Ensure pages is a safe array
   const pages = Array.isArray(businessData?.pages) ? businessData.pages.filter((l) => !l.card_id).slice(0, 5) : [];
   console.log("Pages", pages);

   const banners = businessData.banners;

   // Show loading spinner until data is fully loaded
   if (pages.length === 0) {
      return (
         <Container className="theme-container" sx={{ textAlign: 'center', marginTop: '2rem' }}>
            <CircularProgress />
            <Typography variant="body1" mt={2}>Loading...</Typography>
         </Container>
      );
   }

   return (
      <Container className="theme-container">
         {/* Profile Section */}
         <Box className="profile-section">
            <img src={business.image} alt={`${business.name}-logo`} className="profile-image" />
         </Box>

         <Box className="banners-section">
            <Banners banners={banners} />
         </Box>

         <Typography variant="h5" className="profile-name">{business.name}</Typography>

         {/* Contact Info Section */}
         <Box className="contact-info-section">
            {business.phone && (
               <Typography variant="body1" sx={{ color: theme ? theme.primary_text_color : "blue" }} className="contact-item">
                  <LocalPhoneRounded sx={{ color: theme ? theme.primary_theme_color : "blue" }} />
                  <a href={`tel:${business.phone}`}>{business.phone}</a>
               </Typography>
            )}
            {business.email && (
               <Typography variant="body1" sx={{ color: theme ? theme.primary_text_color : "blue" }} className="contact-item">
                  <EmailRounded sx={{ color: theme ? theme.primary_theme_color : "blue" }} />
                  <a href={`mailto:${business.email}`}>{business.email}</a>
               </Typography>
            )}
            {business.address && (
               <Typography variant="body1" sx={{ color: theme ? theme.primary_text_color : "blue" }} className="contact-item">
                  <PlaceRounded sx={{ color: theme ? theme.primary_theme_color : "blue" }} />
                  {business.address}
               </Typography>
            )}
            {business.bio && (
               <Typography textAlign="justify" variant="body1" sx={{ color: theme ? theme.primary_text_color : "blue" }} className="contact-item">
                  <ArticleRounded sx={{ color: theme ? theme.primary_theme_color : "blue", fontWeight: 'bolder' }} />
                  {business.bio}
               </Typography>
            )}
         </Box>

         <br />
         <ContactLinks pages={pages} />
         <br />

         {/* Links Section */}
         <Stack className="links-section">
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
               ))}
         </Stack>

         <FeedbackFrom theme={theme} pages={pages} />

         {/* Footer Section */}
         <footer className="footer-section">
            <Typography variant="caption">
               Powered by: <a href="https://magicqr.in" target="_blank" rel="noopener noreferrer">
                  <img style={{ height: '50px' }} src={magicQrImg} alt="magic-r" />
               </a>
            </Typography>
            <Stack component="div" onClick={() => window.open("https://shop.magicqr.in", "_blank")} mt={2} sx={{ p: 2, cursor: 'pointer', backgroundColor: theme && theme.primary_theme_color, borderRadius: 2 }} direction="row" alignItems="center" justifyContent="center">
               <Typography sx={{ color: theme && theme.secondary_text_color }} variant='body2'>Get Your Own MagicQR.</Typography>
            </Stack>
         </footer>
      </Container>
   );
};

export default Contact;
