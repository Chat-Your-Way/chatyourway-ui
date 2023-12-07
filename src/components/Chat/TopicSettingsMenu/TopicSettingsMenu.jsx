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
  MenuIconSubscribe,
  MenuIconHeart,
  MenuIconComplain,
} from './TopicSettings.styled';
import { useAddFavouriteMutation } from '../../../redux/topics-operations';

const TopicSettingsMenu = ({ topicId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [addFavourite] = useAddFavouriteMutation();

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleFavourite = async () => {
    try {
      const { error } = await addFavourite(topicId);
      if (error) {
        alert(error.data.message);
      } else {
        alert('Додано до улюблених тем');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = () => {
    handleClose();
  };

  const handleComplain = () => {
    handleClose();
  };

  const handleSearch = () => {
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

        <SettingsItemStyled onClick={handleSubscribe} disableRipple>
          <ListItemIcon>
            {<IconButton icon={<MenuIconSubscribe />} />}
          </ListItemIcon>
          <SettingsTextStyled primary="підписатися" />
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
