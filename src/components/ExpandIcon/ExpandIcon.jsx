import { Box } from '@mui/material';
import { OpenIcon, CloseIcon } from './ExpandIcon.styled';

const ExpandIcon = () => {
  return (
    <Box
      sx={{
        '.Mui-expanded & > .collapsIconWrapper': {
          display: 'none',
        },
        '.expandIconWrapper': {
          display: 'none',
        },
        '.Mui-expanded & > .expandIconWrapper': {
          display: 'block',
        },
      }}
    >
      <div className="expandIconWrapper">
        <CloseIcon />
      </div>
      <div className="collapsIconWrapper">
        <OpenIcon />
      </div>
    </Box>
  );
};

export default ExpandIcon;
