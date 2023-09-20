import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import styled from '@emotion/styled';

export const StyledSwitch = styled(Switch, {
  shouldForwardProp: (p) => p !== 'labelPosition',
})`
  padding: 8px;
  display: flex;
  align-items: center;

  .MuiSwitch-input {
    display: flex;
    align-items: center;
    height: 24px;
    width: 40px;
  }

  .MuiSwitch-track {
    border-radius: 12px;
    border: ${(p) => `1px solid ${p.theme.palette.primary.main}`};

    background: ${(p) => p.theme.palette.primary.disabled};
  }

  .Mui-checked + .MuiSwitch-track {
    border: 1px solid transparent;
    background: ${(p) => p.theme.palette.primary.main};
  }

  .MuiSwitch-thumb {
    color: ${(p) => p.theme.palette.primary.main};
    margin-top: 2px;
    margin-left: 4px;
    margin-right: 0;
    width: 16px;
    height: 16px;
    box-shadow: none;
  }

  .Mui-checked .MuiSwitch-thumb {
    margin-left: 0;
    margin-right: 4px;
    color: ${(p) => p.theme.palette.primary.white};
  }

  .MuiSwitch-switchBase {
    &:hover {
      background: none;
    }
  }

  .MuiTouchRipple-ripple .MuiTouchRipple-child {
    background: none;

    &:hover {
      background: none;
    }
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  user-select: none;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(p) =>
    p.control.props.labelPosition === 'start' ? 'row-reverse' : 'row'};

  .MuiFormControlLabel-root {
    height: 22px;
    display: flex;
    align-items: center;
  }

  .MuiFormControlLabel-label {
    color: ${(p) => p.theme.palette.primary.dark};
  }

  .MuiTouchRipple-ripple .MuiTouchRipple-child {
    background: none;
  }
`;
