/* eslint-disable no-unused-vars */
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
import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useSubscribeMutation,
  useUnsubscribeMutation,
  useGetAllQuery,
} from '../../../redux/topics-operations';

const TopicSettingsMenu = ({ topicId, subscribeStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, isError } = useGetAllQuery('favourite');
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();

  if (isError) {
    alert('Виникла помилка під час отримання тем');
  }

  const favouriteStatus = () => {
    if (data) {
      const result = data.find((el) => el.id === Number(topicId));
      return result ? true : false;
    }
  };

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAddFavourite = async () => {
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

  const handleRemoveFavourite = async () => {
    try {
      const { error } = await removeFavourite(topicId);
      if (error) {
        alert(error.data.message);
      } else {
        alert('Видалено з улюблених тем');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const { error } = await subscribe(topicId);
      if (error) {
        alert(error.data.message);
      } else {
        alert('Підписка успішна');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const { error } = await unsubscribe(topicId);
      if (error) {
        alert(error.data.message);
      } else {
        alert('Відписка успішна');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
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

        {!subscribeStatus ? (
          <SettingsItemStyled onClick={handleSubscribe} disableRipple>
            <ListItemIcon>
              {<IconButton icon={<MenuIconSubscribe />} />}
            </ListItemIcon>
            <SettingsTextStyled primary="підписатися" />
          </SettingsItemStyled>
        ) : (
          <SettingsItemStyled onClick={handleUnsubscribe} disableRipple>
            <ListItemIcon>
              {<IconButton icon={<MenuIconSubscribe />} />}
            </ListItemIcon>
            <SettingsTextStyled primary="відписатися" />
          </SettingsItemStyled>
        )}

        {favouriteStatus() ? (
          <SettingsItemStyled onClick={handleRemoveFavourite} disableRipple>
            <ListItemIcon>
              {<IconButton icon={<MenuIconHeart />} />}
            </ListItemIcon>
            <SettingsTextStyled primary="Забрати із улюбленого" />
          </SettingsItemStyled>
        ) : (
          <SettingsItemStyled
            onClick={handleAddFavourite}
            disableRipple
            disabled={!subscribeStatus}
          >
            <ListItemIcon>
              {<IconButton icon={<MenuIconHeart />} />}
            </ListItemIcon>
            <SettingsTextStyled primary="додати чат до улюбленого" />
          </SettingsItemStyled>
        )}

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
