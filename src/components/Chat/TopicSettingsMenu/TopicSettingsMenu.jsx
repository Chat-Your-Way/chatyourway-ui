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
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../../../redux/authOperationsToolkit/authOperationsThunkSlice';
import localLogOutUtil from '../../../utils/localLogOutUtil';
import { useLocalLogoutUtil } from '../../../hooks/useLocalLogOutUtil';

import { toast } from 'react-toastify';
import { complainTopic } from '../../../redux/complainTopicToolkit/complainTopicToolkit';

const TopicSettingsMenu = ({ topicId, subscribeStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const accessTokenInStore = useSelector(selectAccessToken);
  const { data, isError, error } = useGetAllQuery(
    {
      filter: 'favourite',
      accessTokenInStore,
    },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true },
  );
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();

  const { logoutUtilFN } = useLocalLogoutUtil();

  if (isError) {
    // alert(
    //   'Виникла помилка під час отримання улюблених тем (TopicSettingsMenu)',
    // );
    toast.error(
      'Виникла помилка під час отримання улюблених тем (TopicSettingsMenu)',
    );
    if (error.data?.httpStatus === 'UNAUTHORIZED') {
      // alert(
      //   'Виникла помилка під час отримання улюблених тем, авторизуйтесь в системмі!',
      // );
      toast.error(
        'Виникла помилка під час отримання улюблених тем, авторизуйтесь в системмі!',
      );
      logoutUtilFN();
      // localLogOutUtil(dispatch);
      // dispatch(setIsLoggedIn(false));
      // dispatch(setAccessToken(null));
      // return dispatch(setRefreshToken(null));
    }
  }

  const favouriteStatus = () => {
    if (data) {
      const result = data.find((el) => el.id === topicId);

      return result ? true : false;
    }
  };

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAddFavourite = async () => {
    try {
      const { error } = await addFavourite({ topicId, accessTokenInStore });
      if (error) {
        // alert('Виникла помилка під час додання теми до улюблених');
        toast.error('Виникла помилка під час додання теми до улюблених');
      } else {
        // alert('Додано до улюблених тем');
        toast.success('Додано до улюблених тем');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavourite = async () => {
    try {
      const { error } = await removeFavourite({ topicId, accessTokenInStore });
      if (error) {
        // alert('Виникла помилка під час видалення теми з улюблених');
        toast.error('Виникла помилка під час видалення теми з улюблених');
      } else {
        // alert('Видалено з улюблених тем');
        toast.success('Видалено з улюблених тем');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const { error } = await subscribe({ topicId, accessTokenInStore });
      if (error) {
        // alert('Виникла помилка під час підписки на тему');
        toast.error('Виникла помилка під час підписки на тему');
      } else {
        // alert('Підписка успішна');
        toast.success('Підписка успішна');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const { error } = await unsubscribe({ topicId, accessTokenInStore });
      if (error) {
        // alert('Виникла помилка під час відписки від теми');
        toast.error('Виникла помилка під час відписки від теми');
      } else {
        // alert('Відписка успішна');
        toast.success('Відписка успішна');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplain = () => {
    dispatch(complainTopic(topicId));
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
          <SettingsTextStyled primary="Пошук" />
          <IconButton onClick={handleClose} icon={<IconCloseStyled />} />
        </SettingsItemStyled>

        {!subscribeStatus ? (
          <SettingsItemStyled onClick={handleSubscribe} disableRipple>
            <ListItemIcon>
              {<IconButton icon={<MenuIconSubscribe />} />}
            </ListItemIcon>
            <SettingsTextStyled
              primary={subscribeStatus ? 'Відписатися' : 'Підписатися'}
            />
          </SettingsItemStyled>
        ) : (
          <SettingsItemStyled onClick={handleUnsubscribe} disableRipple>
            <ListItemIcon>
              {<IconButton icon={<MenuIconSubscribe />} />}
            </ListItemIcon>
            <SettingsTextStyled primary="Відписатися" />
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
            // disableRipple
            // disabled={!subscribeStatus}
          >
            <ListItemIcon>
              {<IconButton icon={<MenuIconHeart />} />}
            </ListItemIcon>
            <SettingsTextStyled primary="Додати чат до улюбленого" />
          </SettingsItemStyled>
        )}

        <SettingsItemStyled onClick={handleComplain} disableRipple>
          <ListItemIcon>
            {<IconButton icon={<MenuIconComplain />} />}
          </ListItemIcon>
          <SettingsTextStyled primary="Поскаржитися" />
        </SettingsItemStyled>
      </SettingsMenuStyled>
    </Box>
  );
};

export default TopicSettingsMenu;
