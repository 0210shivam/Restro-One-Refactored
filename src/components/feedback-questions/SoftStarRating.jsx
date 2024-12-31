import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Styled Rating component for soft star appearance
const SoftStyledRating = styled(Rating)(({ theme }) => ({
   '& .MuiRating-iconFilled': {
      color: '#FFC107', // Soft yellow for selected stars
   },
   '& .MuiRating-iconEmpty': {
      color: '#E0E0E0', // Light gray for unselected stars
   },
   '& .MuiRating-icon': {
      fontSize: '2rem', // Slightly larger stars for better visibility
   },
}));

const SoftStarRating = ({ value, onChange }) => {
   // Remove internal state, rely on the parent to control the value

   const handleChange = (event, newValue) => {
      if (onChange) {
         onChange(newValue); // Call the parent's onChange callback
      }
   };

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <SoftStyledRating
            value={value}  // Controlled by the parent component
            onChange={handleChange}
            precision={1} // Allow whole number ratings only
         />
      </Box>
   );
};

export default SoftStarRating;
