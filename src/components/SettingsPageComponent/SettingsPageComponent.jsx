import { useContext, useState } from 'react';
import Toogle from '../../ui-kit/components/Toogle';
import {
  AvatarList,
  ChangeInputStyled,
  NewSettingsWrap,
  SaveChangeButton,
  SettingsIcon,
  SettingsIconButton,
  SettingsIconEdit,
  SettingsLabel,
  SettingsPageMainTitle,
  SettingsPageWarp,
  SettingsWrap,
} from './SettingsPageComponent.styled';
import { ThemeContext } from '../../ui-kit/theme/ThemeProvider';
import { ListItem } from '@mui/material';
import Avatar from '../../ui-kit/components/Avatar';

const SettingsPageComponent = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);

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
        <Toogle />
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
      {isChangeNameVisible && (
        <NewSettingsWrap>
          <SettingsLabel variant="h5">Нове ім`я</SettingsLabel>
          <ChangeInputStyled endAdornment={<SettingsIconEdit />} />
          <SaveChangeButton label="Підтвердити" />
        </NewSettingsWrap>
      )}
      <SettingsWrap>
        <SettingsLabel variant="h4">Змінити аватар</SettingsLabel>
        <SettingsIconButton
          icon={<SettingsIcon />}
          handleClick={handleChangeAvatarClick}
        />
      </SettingsWrap>
      {isChangeAvatarVisible && (
        <NewSettingsWrap>
          <AvatarList>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
            <ListItem>
              <Avatar />
            </ListItem>
          </AvatarList>
          <SaveChangeButton label="Підтвердити" />
        </NewSettingsWrap>
      )}
    </SettingsPageWarp>
  );
};

export default SettingsPageComponent;