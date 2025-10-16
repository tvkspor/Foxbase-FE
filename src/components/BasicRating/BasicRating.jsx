import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'goldenrod', // filled star color
  },
  '& .MuiRating-iconHover': {
    color: 'goldenrod', // hover color
  },
  '& .MuiRating-iconEmpty': {
    color: 'goldenrod', // outlined (empty) star color
  },
});

export default function BasicRating({ value : initialValue = 3, onChange }) {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event, newVal) => {
    setValue(newVal)
      if (onChange){
          onChange(newVal)
      }
  }

  return (
    <Box>
      <StyledRating
        name="simple-controlled"
        size="large"
        precision={0.5}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
