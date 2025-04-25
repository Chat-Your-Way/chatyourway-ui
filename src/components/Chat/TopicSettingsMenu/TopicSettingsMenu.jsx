/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { Box, ListItemIcon, Popper, Stack } from '@mui/material';
import IconButton from '../../../ui-kit/components/IconButton/IconButton';
import {
  IconOpenStyled,
  IconCloseStyled,
  SettingsItemStyled,
  SettingsTextStyled,
  MenuIconSearch,
  MenuIconSubscribe,
  MenuIconHeart,
  MenuIconComplain,
  SettingsMenuStyledList,
  SearchInputStack,
  SearchInputOwn,
  IconDeleteStyled,
  IconLeftArrowCircleStyled,
  IconRightArrowCircleStyled,
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
import { SearchInputStyled } from '../../../ui-kit/components/Input/SearchInput/SearchInput.styled';
import SearchInput from '../../../ui-kit/components/Input/SearchInput';
import debounce from 'lodash.debounce';

const TopicSettingsMenu = ({
  topicId,
  subscribeStatus,
  searchInTopic,
  setSearchInTopic,
  foundMessageId,
  setFoundMessageId,
  foundMessages,
  setFoundMessages,
}) => {
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const anchorElSearchRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
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
      handleCloseMenu();
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
      handleCloseMenu();
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
      handleCloseMenu();
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
      handleCloseMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (e) => {
    if (isSearchActive) {
      setIsSearchActive(false);
    } else if (anchorElMenu) {
      setAnchorElMenu(null);
    } else {
      setAnchorElMenu(e.currentTarget);
    }
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const handleOpenSearch = () => {
    setIsSearchActive(true);
    handleCloseMenu();
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
  };

  const handleComplain = () => {
    dispatch(complainTopic(topicId));
    handleCloseMenu();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // setAnchorElMenu(null);
      handleCloseSearch();
    }
  };

  const handleInputValue = (e) =>
    debounce(setSearchInTopic(e.target.value), 1000);

  return (
    <Stack
      sx={{ justifyContent: 'center', alignItems: 'center' }}
      ref={anchorElSearchRef}
    >
      <IconButton icon={<IconOpenStyled />} onClick={handleOpen} />
      <Popper
        anchorEl={anchorElSearchRef.current}
        // open={Boolean(anchorElSearchRef.current)}
        open={isSearchActive}
        onClose={handleCloseSearch}
        disablePortal
        placement="left"
        sx={{ zIndex: '1' }}
      >
        <SearchInputStack
          // sx={{
          //   flexDirection: 'row',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   padding: '6px 6px',
          //   borderRadius: '16px',
          //   gap: '4px',
          //   height: '100%',
          // }}
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px 6px',
            borderRadius: '16px',
            gap: '4px',
            height: '100%',
          }}
        >
          <MenuIconSearch />
          <IconButton
            icon={<IconLeftArrowCircleStyled />}
            isDisabled={
              foundMessages.length === 0
                ? true
                : foundMessages[0].id === foundMessageId
                ? true
                : false
            }
            onClick={() => {
              const indx = foundMessages.findIndex(
                (el) => el.id === foundMessageId,
              );

              if (indx !== -1) {
                setFoundMessageId(foundMessages[indx - 1].id);
              }
            }}
          />
          <IconButton
            icon={<IconRightArrowCircleStyled />}
            isDisabled={
              foundMessages.length === 0
                ? true
                : foundMessages[foundMessages.length - 1].id === foundMessageId
                ? true
                : false
            }
            onClick={() => {
              const indx = foundMessages.findIndex(
                (el) => el.id === foundMessageId,
              );

              if (indx !== -1) {
                setFoundMessageId(foundMessages[indx + 1].id);
              }
            }}
          />
          <SearchInputOwn
            type="text"
            value={searchInTopic}
            onChange={(e) => setSearchInTopic(e.target.value)}
            onKeyDown={handleSearch}
            inputWidth="200px"
            inputHeight="25px"
            placeholderText="Пошук"
            inputPadding="1px 3px"
            startAdornment={null}
          />
          <IconButton
            onClick={() => setSearchInTopic('')}
            icon={<IconDeleteStyled />}
          />
          <IconButton onClick={handleCloseSearch} icon={<IconCloseStyled />} />
        </SearchInputStack>
      </Popper>
      <Popper
        anchorEl={anchorElMenu}
        open={Boolean(anchorElMenu)}
        onClose={handleCloseMenu}
        disablePortal
        placement="bottom-start"
        sx={{ zIndex: '1' }}
      >
        <SettingsMenuStyledList
          elevation={0}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <SettingsItemStyled disableRipple>
            <ListItemIcon>
              {<IconButton icon={<MenuIconSearch />} />}
            </ListItemIcon>
            {/* <SettingsTextStyled primary="Пошук" /> */}
            {/* {isSearchActive ? (
              <SearchInput
                // type="text"
                // value={searchInTopic}
                handleInputValue={e => setSearchInTopic(e.target.value)}
                // onChange={e => setSearchInTopic(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    // setAnchorElMenu(null);
                    handleClose();
                  }
                }}
                inputWidth="200px"
                inputHeight="25px"
                placeholderText="Пошук"
                inputPadding="1px 3px"
                inputValue={searchInTopic}
                startAdornment={null}
              />
            ) : (
              <SettingsTextStyled primary="Пошук" onClick={() => handleSearch()} />
            )} */}
            <SettingsTextStyled primary="Пошук" onClick={handleOpenSearch} />
            <IconButton onClick={handleCloseMenu} icon={<IconCloseStyled />} />
          </SettingsItemStyled>

          {!subscribeStatus ? (
            <SettingsItemStyled onClick={handleSubscribe} disableRipple>
              <ListItemIcon>
                {<IconButton icon={<MenuIconSubscribe />} />}
              </ListItemIcon>
              <SettingsTextStyled
                // primary={subscribeStatus ? 'Відписатися' : 'Підписатися'}
                primary={'Підписатися'}
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
        </SettingsMenuStyledList>
      </Popper>
    </Stack>
    // The old code - it uses a modal window, with blocking scroll of all page,
    // and the chat window. I need to scroll the result of search in the chat window
    // <Box>
    //   <IconButton icon={<IconOpenStyled />} onClick={handleOpen} />
    //   <SettingsMenuStyled
    //     elevation={0}
    //     anchorOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     transformOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     anchorElMenu={anchorElMenu}
    //     open={Boolean(anchorElMenu)}
    //     onClose={handleClose}
    //   >
    //     <SettingsItemStyled disableRipple>
    //       <ListItemIcon>{<IconButton icon={<MenuIconSearch />} />}</ListItemIcon>
    //       {/* <SettingsTextStyled primary="Пошук" /> */}
    //       {isSearchActive ? (
    //         <input
    //           type="text"
    //           value={searchInTopic}
    //           onChange={e => setSearchInTopic(e.target.value)}
    //           onKeyDown={e => {
    //             if (e.key === 'Enter') {
    //               // setAnchorElMenu(null);
    //               handleClose();
    //             }
    //           }}
    //         />
    //       ) : (
    //         <SettingsTextStyled primary="Пошук" onClick={() => handleSearch()} />
    //       )}
    //       <IconButton onClick={handleClose} icon={<IconCloseStyled />} />
    //     </SettingsItemStyled>

    //     {!subscribeStatus ? (
    //       <SettingsItemStyled onClick={handleSubscribe} disableRipple>
    //         <ListItemIcon>{<IconButton icon={<MenuIconSubscribe />} />}</ListItemIcon>
    //         <SettingsTextStyled
    //           // primary={subscribeStatus ? 'Відписатися' : 'Підписатися'}
    //           primary={'Підписатися'}
    //         />
    //       </SettingsItemStyled>
    //     ) : (
    //       <SettingsItemStyled onClick={handleUnsubscribe} disableRipple>
    //         <ListItemIcon>{<IconButton icon={<MenuIconSubscribe />} />}</ListItemIcon>
    //         <SettingsTextStyled primary="Відписатися" />
    //       </SettingsItemStyled>
    //     )}
    //     {favouriteStatus() ? (
    //       <SettingsItemStyled onClick={handleRemoveFavourite} disableRipple>
    //         <ListItemIcon>{<IconButton icon={<MenuIconHeart />} />}</ListItemIcon>
    //         <SettingsTextStyled primary="Забрати із улюбленого" />
    //       </SettingsItemStyled>
    //     ) : (
    //       <SettingsItemStyled
    //         onClick={handleAddFavourite}
    //         // disableRipple
    //         // disabled={!subscribeStatus}
    //       >
    //         <ListItemIcon>{<IconButton icon={<MenuIconHeart />} />}</ListItemIcon>
    //         <SettingsTextStyled primary="Додати чат до улюбленого" />
    //       </SettingsItemStyled>
    //     )}
    //     <SettingsItemStyled onClick={handleComplain} disableRipple>
    //       <ListItemIcon>{<IconButton icon={<MenuIconComplain />} />}</ListItemIcon>
    //       <SettingsTextStyled primary="Поскаржитися" />
    //     </SettingsItemStyled>
    //   </SettingsMenuStyled>
    // </Box>
  );
};

export default TopicSettingsMenu;
