import { useContext, useState } from 'react';
import {
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

const SettingsPageComponent = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { isPermission, togglePermission } = PermissionPrivateMessage();
  const { isMobile } = useSidebarContext();

  const [isChangeNameVisible, setIsNameChangeVisible] = useState(false);
  const [isChangeAvatarVisible, setIsChangeAvatarVisible] = useState(false);
  const { showAdvancedMenu } = useSidebarContext();
  const handleChangeNameClick = () => {
    setIsNameChangeVisible((prevState) => !prevState);
  };

  const handleChangeAvatarClick = () => {
    setIsChangeAvatarVisible((prevState) => !prevState);
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
        </SettingsPageWrapAdd>
      </SettingsPageWrap>
    )
  );
};

export default SettingsPageComponent;
