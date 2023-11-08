import { Box } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

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
        <ICONS.CLOSE_SQUARE />
      </div>
      <div className="collapsIconWrapper">
        <ICONS.ARROW_DOWN2 />
      </div>
    </Box>
  );
};

export default ExpandIcon;
