/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  LinearProgress,
  ListItemIcon,
  Popper,
  Stack,
} from '@mui/material';
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
  BadgeStyled,
  ListItemIconStyled,
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
import { useLocalLogoutUtil } from '../../../hooks/useLocalLogOutUtil';
import { toast } from 'react-toastify';
import {
  complainStatusChange,
  complainTopic,
} from '../../../redux/complainTopicToolkit/complainTopicToolkit';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';
import {
  selectComplainTopicIsError,
  selectComplainTopicIsLoading,
  selectComplainTopicResult,
  selectComplainTopicStatus,
} from '../../../redux/complainTopicToolkit/complainTopicSelectors';

const TopicSettingsMenu = ({
  topicId,
  subscribeStatus,
  searchInTopic,
  setSearchInTopic,
  foundMessageId,
  setFoundMessageId,
  foundMessages,
}) => {
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const anchorElSearchRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { isMobile } = useSidebarContext();
  const dispatch = useDispatch();
  const accessTokenInStore = useSelector(selectAccessToken);
  const { data, isError, error } = useGetAllQuery(
    {
      filter: 'favourite',
      accessTokenInStore,
    },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true },
  );
  const [addFavourite, { isLoading: addFavouriteIsLoading }] =
    useAddFavouriteMutation();
  const [removeFavourite, { isLoading: removeFavouriteIsLoading }] =
    useRemoveFavouriteMutation();
  const [subscribe, { isLoading: subscribeTopicsIsLoading }] =
    useSubscribeMutation();
  const [unsubscribe, { isLoading: unSubscribeTopicsIsLoading }] =
    useUnsubscribeMutation();

  const complainStatus = useSelector(selectComplainTopicStatus);
  const complainIsLoading = useSelector(selectComplainTopicIsLoading);
  const complainIsError = useSelector(selectComplainTopicIsError);
  const complainResult = useSelector(selectComplainTopicResult);

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

  const handleUnsubscribe = useCallback(async () => {
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
  }, [topicId, accessTokenInStore, unsubscribe]);

  const handleOpen = (e) => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSearchInTopic('');
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
    // handleCloseMenu();
  };

  const handleSearch = (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      setSearchInTopic('');
      handleCloseSearch();
    }
  };

  useEffect(() => {
    if (!complainIsLoading && complainStatus === 'success') {
      toast.success(
        'Ви успішно поскаржились на даний чат! Автоматично відписуєтесь!',
      );
      handleUnsubscribe();
      dispatch(complainStatusChange('idle'));
    } else if (
      !complainIsLoading &&
      complainIsError &&
      complainStatus === 'error'
    ) {
      toast.error(
        'Виникла помилка під час відправки скарги! Спробуйте пізніше',
      );
      dispatch(complainStatusChange('idle'));
    } else {
      return;
    }
  }, [
    complainIsLoading,
    complainIsError,
    complainStatus,
    dispatch,
    handleUnsubscribe,
  ]);

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
        placement={isMobile ? 'bottom-end' : 'left'}
        sx={{ zIndex: '1' }}
      >
        <SearchInputStack
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
          <BadgeStyled
            showZero={searchInTopic ? true : false}
            badgeContent={foundMessages.length}
          >
            <MenuIconSearch />
          </BadgeStyled>
          <BadgeStyled
            showZero={searchInTopic ? true : false}
            badgeContent={
              foundMessages.findIndex((el) => el.id === foundMessageId) === -1
                ? 0
                : foundMessages.findIndex((el) => el.id === foundMessageId)
            }
          >
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
              pLeft="0"
              pRight="0"
              pTop="0"
              pBottom="0"
            />
          </BadgeStyled>
          <BadgeStyled
            showZero={searchInTopic ? true : false}
            badgeContent={
              foundMessages.findIndex((el) => el.id === foundMessageId) ===
                -1 ||
              foundMessages.findIndex((el) => el.id === foundMessageId) + 1 ===
                foundMessages.length
                ? 0
                : Math.abs(
                    foundMessages.findIndex((el) => el.id === foundMessageId) -
                      foundMessages.length +
                      1,
                  )
            }
          >
            <IconButton
              icon={<IconRightArrowCircleStyled />}
              isDisabled={
                foundMessages.length === 0
                  ? true
                  : foundMessages[foundMessages.length - 1].id ===
                    foundMessageId
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
              pLeft="0"
              pRight="0"
              pTop="0"
              pBottom="0"
            />
          </BadgeStyled>
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
          <IconButton
            onClick={() => {
              handleCloseSearch();
              setSearchInTopic('');
            }}
            icon={<IconCloseStyled />}
          />
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
              {subscribeTopicsIsLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                  }}
                >
                  <LinearProgress />
                </Box>
              ) : null}
              <ListItemIconStyled
                subscribeTopicsIsLoading={subscribeTopicsIsLoading}
              >
                {<IconButton icon={<MenuIconSubscribe />} />}
              </ListItemIconStyled>
              <SettingsTextStyled
                // primary={subscribeStatus ? 'Відписатися' : 'Підписатися'}
                primary={'Підписатися'}
                subscribeTopicsIsLoading={subscribeTopicsIsLoading}
              />
            </SettingsItemStyled>
          ) : (
            <SettingsItemStyled onClick={handleUnsubscribe} disableRipple>
              {unSubscribeTopicsIsLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                  }}
                >
                  <LinearProgress />
                </Box>
              ) : null}
              <ListItemIconStyled
                unSubscribeTopicsIsLoading={unSubscribeTopicsIsLoading}
              >
                {<IconButton icon={<MenuIconSubscribe />} />}
              </ListItemIconStyled>
              <SettingsTextStyled
                primary="Відписатися"
                unSubscribeTopicsIsLoading={unSubscribeTopicsIsLoading}
              />
            </SettingsItemStyled>
          )}
          {favouriteStatus() ? (
            <SettingsItemStyled onClick={handleRemoveFavourite} disableRipple>
              {removeFavouriteIsLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                  }}
                >
                  <LinearProgress />
                </Box>
              ) : null}
              <ListItemIconStyled
                removeFavouriteIsLoading={removeFavouriteIsLoading}
              >
                {<IconButton icon={<MenuIconHeart />} />}
              </ListItemIconStyled>
              <SettingsTextStyled
                primary="Забрати із улюбленого"
                removeFavouriteIsLoading={removeFavouriteIsLoading}
              />
            </SettingsItemStyled>
          ) : (
            <SettingsItemStyled
              onClick={handleAddFavourite}
              // disableRipple
              // disabled={!subscribeStatus}
            >
              {addFavouriteIsLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                  }}
                >
                  <LinearProgress />
                </Box>
              ) : null}
              <ListItemIconStyled addFavouriteIsLoading={addFavouriteIsLoading}>
                {<IconButton icon={<MenuIconHeart />} />}
              </ListItemIconStyled>
              <SettingsTextStyled
                primary="Додати чат до улюбленого"
                addFavouriteIsLoading={addFavouriteIsLoading}
              />
            </SettingsItemStyled>
          )}
          <SettingsItemStyled onClick={handleComplain} disableRipple>
            {complainIsLoading ? (
              <Box
                sx={{
                  width: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                }}
              >
                <LinearProgress />
              </Box>
            ) : null}
            <ListItemIconStyled complainIsLoading={complainIsLoading}>
              {<IconButton icon={<MenuIconComplain />} />}
            </ListItemIconStyled>
            <SettingsTextStyled
              primary="Поскаржитися"
              complainIsLoading={complainIsLoading}
            />
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
