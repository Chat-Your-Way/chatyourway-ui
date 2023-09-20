import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import styled from '@emotion/styled';

export const StyledRadioButton = styled(Radio)`
  padding: 8px;
  color: ${(p) => p.theme.palette.primary.main};
  fill: ${(p) => p.theme.palette.primary.main};

  &.Mui-checked {
    color: ${(p) => p.theme.palette.primary.main};
  }

  .MuiTouchRipple-ripple .MuiTouchRipple-child {
    background: none;
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  user-select: none;

  .MuiTypography-root {
    color: ${(p) => p.theme.palette.primary.dark};
  }

  .MuiTouchRipple-ripple .MuiTouchRipple-child {
    background: none;
  }
`;
