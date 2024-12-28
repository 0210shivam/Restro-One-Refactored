import React from 'react';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';

// Custom emoji icons for the rating levels
const customIcons = {
   1: '😢',  // Sad
   2: '😟',  // Worried
   3: '😕',  // Confused
   4: '😊',  // Happy
   5: '😍',  // Love it
};

const IconContainer = ({ value, ...other }) => (
   <span {...other} style={{
      fontSize: '2rem', margin: '0 8px',
      opacity: 1, // Opacity logic
      transition: 'opacity 0.3s ease-in-out' // Smooth transition
   }}>
      {customIcons[value]}
   </span>
);

const EmojiRatings = ({ value, onChange }) => {
   // Remove internal state and rely on props value and onChange

   const handleChange = (event, newValue) => {
      if (onChange) {
         onChange(newValue); // Call the parent's onChange function
      }
   };

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Rating
            value={value}  // Controlled by the parent component
            onChange={handleChange}
            getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
         />
      </Box>
   );
};

export default EmojiRatings;
