import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const YesNoSelector = ({ value, onChange }) => {

   const handleChange = (event) => {
      const selectedValue = event.target.value;
      if (onChange) {
         onChange(selectedValue); // Trigger the parent's onChange callback with the selected value
      }
   };

   return (
      <FormControl component="fieldset">
         <RadioGroup
            value={value} // Use the value prop passed from the parent
            onChange={handleChange}
            row // Makes the options appear in a row
         >
            <FormControlLabel
               value="1"
               control={<Radio />}
               label="Yes"
            />
            <FormControlLabel
               value="0"
               control={<Radio />}
               label="No"
            />
         </RadioGroup>
      </FormControl>
   );
};

export default YesNoSelector;
