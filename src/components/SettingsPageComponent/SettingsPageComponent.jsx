import { useContext, useState } from 'react';
import {
  SettingsIcon,
  SettingsIconButton,
  SettingsLabel,
  SettingsPageMainTitle,
  SettingsPageWarp,
  SettingsWrap,
} from './SettingsPageComponent.styled';
import { ThemeContext } from '../../ui-kit/theme/ThemeProvider';
import Toogle from '../../ui-kit/components/Toogle';
import { PermissionPrivateMessage } from './UserSettings/PermissionPrivateMessage';
import ChangeNameInput from './ChangeNameInput';
import ChangeUserAvatar from './ChangeUserAvatar/ChangeUserAvatar';

const SettingsPageComponent = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { isPermission, togglePermission } = PermissionPrivateMessage();

  const [isChangeNameVisible, setIsNameChangeVisible] = useState(false);
  const [isChangeAvatarVisible, setIsAvatarChangeVisible] = useState(false);

  const handleChangeNameClick = () => {
    setIsNameChangeVisible((prevState) => !prevState);
  };

  const handleChangeAvatarClick = () => {
    setIsAvatarChangeVisible((prevState) => !prevState);
  };

  return (
    <SettingsPageWarp>
      <SettingsPageMainTitle variant="h1">Налаштування</SettingsPageMainTitle>
      <SettingsWrap>
        <SettingsLabel variant="h4">Виберіть тему світла/темна</SettingsLabel>
        <Toogle
          handleChange={toggleTheme}
          isChecked={currentTheme === 'dark'}
        />
      </SettingsWrap>
      <SettingsWrap>
        <SettingsLabel variant="h4">
          Дозвіл на отримання приватних повідомлень
        </SettingsLabel>
        <Toogle
          handleChange={togglePermission}
          isChecked={isPermission === 'true'}
        />
      </SettingsWrap>
      <SettingsWrap>
        <SettingsLabel variant="h4">Звукове сповіщення</SettingsLabel>
        <Toogle />
      </SettingsWrap>
      <SettingsWrap>
        <SettingsLabel variant="h4">Змінити ім`я</SettingsLabel>
        <SettingsIconButton
          icon={<SettingsIcon />}
          handleClick={handleChangeNameClick}
        />
      </SettingsWrap>
      {isChangeNameVisible && <ChangeNameInput />}
      <SettingsWrap>
        <SettingsLabel variant="h4">Змінити аватар</SettingsLabel>
        <SettingsIconButton
          icon={<SettingsIcon />}
          handleClick={handleChangeAvatarClick}
        />
      </SettingsWrap>
      {isChangeAvatarVisible && <ChangeUserAvatar />}
    </SettingsPageWarp>
  );
};

export default SettingsPageComponent;
