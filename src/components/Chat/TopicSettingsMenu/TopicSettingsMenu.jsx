import { useState } from 'react';
import { Box, ListItemIcon } from '@mui/material';
import IconButton from '../../../ui-kit/components/IconButton/IconButton';
import {
  IconOpenStyled,
  IconCloseStyled,
  SettingsMenuStyled,
  SettingsItemStyled,
  SettingsTextStyled,
  MenuIconSearch,
  MenuIconHeart,
  MenuIconComplain,
} from './TopicSettings.styled';

const TopicSettingsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSearch = () => {
    handleClose();
  };

  const handleFavourite = () => {
    handleClose();
  };

  const handleComplain = () => {
    handleClose();
  };

  return (
    <Box>
      <IconButton icon={<IconOpenStyled />} onClick={handleOpen} />
      <SettingsMenuStyled
        elevation={0}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <SettingsItemStyled onClick={handleSearch} disableRipple>
          <ListItemIcon>
            {<IconButton icon={<MenuIconSearch />} />}
          </ListItemIcon>
          <SettingsTextStyled primary="пошук" />
          <IconButton onClick={handleClose} icon={<IconCloseStyled />} />
        </SettingsItemStyled>

        <SettingsItemStyled onClick={handleFavourite} disableRipple>
          <ListItemIcon>{<IconButton icon={<MenuIconHeart />} />}</ListItemIcon>
          <SettingsTextStyled primary="додати чат до улюбленого" />
        </SettingsItemStyled>

        <SettingsItemStyled onClick={handleComplain} disableRipple>
          <ListItemIcon>
            {<IconButton icon={<MenuIconComplain />} />}
          </ListItemIcon>
          <SettingsTextStyled primary="поскаржитися" />
        </SettingsItemStyled>
      </SettingsMenuStyled>
    </Box>
  );
};

export default TopicSettingsMenu;
