import { useContext, useState } from 'react';
import {
  DeleteButton,
  SettingsIcon,
  SettingsIconButton,
  SettingsLabel,
  SettingsPageMainTitle,
  SettingsPageWrap,
  SettingsPageWrapAdd,
  SettingsWrap,
} from './SettingsPageComponent.styled';
import { ThemeContext } from '../../ui-kit/theme/ThemeProvider';
import Toogle from '../../ui-kit/components/Toogle';
import { PermissionPrivateMessage } from './UserSettings/PermissionPrivateMessage';
import ChangeNameComponent from './ChangeNameInput';
import ChangeUserAvatar from './ChangeUserAvatar/ChangeUserAvatar';
import { useSidebarContext } from '../../common/Sidebar/SidebarContext';
import { useDeleteUserMutation } from '../../redux/auth-operations';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/userSlice';
import { selectAccessToken } from '../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { toast } from 'react-toastify';
import { useLocalLogoutUtil } from '../../hooks/useLocalLogOutUtil';

const SettingsPageComponent = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { isPermission, togglePermission } = PermissionPrivateMessage();
  const { isMobile } = useSidebarContext();
  const { contactId } = useSelector(selectUserInfo);
  const [isChangeNameVisible, setIsNameChangeVisible] = useState(false);
  const [isChangeAvatarVisible, setIsChangeAvatarVisible] = useState(false);
  const { showAdvancedMenu } = useSidebarContext();
  const [deleteUser] = useDeleteUserMutation();
  const { logoutUtilFN } = useLocalLogoutUtil();
  const accessTokenInStore = useSelector(selectAccessToken);
  const handleChangeNameClick = () => {
    setIsNameChangeVisible((prevState) => !prevState);
  };

  const handleChangeAvatarClick = () => {
    setIsChangeAvatarVisible((prevState) => !prevState);
  };

  const handleDeleteUser = async () => {
    event.preventDefault();
    if (!contactId) {
      toast.error('Помилка: дані користувача не завантажені.');
      return;
    }

    if (confirm('Ви впевнені, що хочете видалити обліковий запис?')) {
      try {
        // eslint-disable-next-line
        const result = await deleteUser({ contactId, accessTokenInStore }).unwrap();

        if (result.data === 'success') {
          toast.success('Обліковий запис видалено');
        }
        setTimeout(() => {
          logoutUtilFN();
        }, 7000);
      } catch (error) {
        toast.error(error?.message || 'Невідома помилка');
      }
    }
  };

  return (
    showAdvancedMenu && (
      <SettingsPageWrap>
        <SettingsPageMainTitle variant="h1">Налаштування</SettingsPageMainTitle>
        <SettingsPageWrapAdd>
          <SettingsWrap>
            <SettingsLabel variant={isMobile ? 'h5' : 'h4'}>
              Виберіть тему світла/темна
            </SettingsLabel>
            <Toogle
              handleChange={toggleTheme}
              isChecked={currentTheme === 'dark'}
            />
          </SettingsWrap>
          <SettingsWrap>
            <SettingsLabel variant={isMobile ? 'h5' : 'h4'}>
              Дозвіл на отримання приватних повідомлень
            </SettingsLabel>
            <Toogle
              handleChange={togglePermission}
              isChecked={isPermission === 'true'}
            />
          </SettingsWrap>
          <SettingsWrap>
            <SettingsLabel variant={isMobile ? 'h5' : 'h4'}>
              Звукове сповіщення
            </SettingsLabel>
            <Toogle />
          </SettingsWrap>
          <SettingsWrap>
            <SettingsLabel variant={isMobile ? 'h5' : 'h4'}>
              Змінити ім`я
            </SettingsLabel>
            <SettingsIconButton
              icon={<SettingsIcon />}
              handleClick={handleChangeNameClick}
            />
          </SettingsWrap>
          {isChangeNameVisible && <ChangeNameComponent />}
          <SettingsWrap>
            <SettingsLabel variant={isMobile ? 'h5' : 'h4'}>
              Змінити аватар
            </SettingsLabel>
            <SettingsIconButton
              icon={<SettingsIcon />}
              handleClick={handleChangeAvatarClick}
            />
          </SettingsWrap>
          {isChangeAvatarVisible && (
            <ChangeUserAvatar
              setIsChangeAvatarVisible={setIsChangeAvatarVisible}
            />
          )}
          <SettingsWrap>
            <SettingsLabel variant={isMobile ? 'h5' : 'h4'}>
              Видалити аккаунт
            </SettingsLabel>
            <DeleteButton onClick={handleDeleteUser}>Видалити</DeleteButton>
            {/*<SettingsIconButton*/}
            {/*  icon={<SettingsIcon />}*/}
            {/*  handleClick={handleDeleteUser}*/}
            {/*/>*/}
          </SettingsWrap>
        </SettingsPageWrapAdd>
      </SettingsPageWrap>
    )
  );
};

export default SettingsPageComponent;
