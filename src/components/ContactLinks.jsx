import { Grid2 } from '@mui/material'
import React from 'react'
import SocialLinks from '../global/utils/LinkExport'
import isValidURL from '../global/url/isValidURL'
import isValidHostname from '../global/url/isValidHostname'
import { Link } from 'react-router'

const ContactLinks = ({ pages }) => {
   return (
      <div>
         <Grid2 container spacing={2} sx={{ justifyContent: 'center', alignItems: "center" }}>
            {
               pages && pages.length > 0 &&
               pages
                  .filter(link => link.status === "1" && link.type === "0" && !link.card_id && (SocialLinks.find((l) => l.page_title === link.page_title)))
                  .sort((a, b) => a.seq_no - b.seq_no)
                  .map((link) => {
                     const validLink = isValidURL(link.link) && isValidHostname(link.link)
                        ? `https://${link.link}`
                        : link.link;

                     return (
                        <Grid2 key={link.id} item sx={{ cursor: 'pointer' }}>
                           <Link to={validLink} target='_blank'>
                              <img style={{ height: '40px' }} src={SocialLinks.find((i) => i.page_title === link.page_title)?.image} alt="link-img" />
                           </Link>
                        </Grid2>
                     );
                  })
            }
         </Grid2>
      </div>
   );
}

export default ContactLinks;
