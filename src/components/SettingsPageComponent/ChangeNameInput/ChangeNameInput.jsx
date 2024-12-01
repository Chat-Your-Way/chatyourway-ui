/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/userSlice';
import { useEditUserInfoMutation } from '../../../redux/user-operations';
import { NewSettingsWrap, SaveChangeButton } from './ChangeNameInput.styled';
import { FieldText } from '../../RegistrationPageComponent/FieldText/FieldText';
import { useForm } from 'react-hook-form';
// import { SettingsLabel } from '../SettingsPageComponent.styled';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { useLocalLogoutUtil } from '../../../hooks/useLocalLogOutUtil';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';

const ChangeNameComponent = () => {
  const { nickname, avatarId } = useSelector(selectUserInfo);
  const accessTokenInStore = useSelector(selectAccessToken);
  const { isMobile, isTabletAndHigher } = useSidebarContext();
  const { logoutUtilFN } = useLocalLogoutUtil();
  const [editUserInfo] = useEditUserInfoMutation();

  const defaultValues = {
    nickname: nickname,
    avatar: avatarId,
  };

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    control,
  } = useForm({ defaultValues: defaultValues, mode: 'onChange' });

  const handleInputNameChange = async (event) => {
    const value = {
      nickname: event.nickname,
      avatarId: defaultValues.avatar,
    };

    try {
      const { isError } = await editUserInfo({ value, accessTokenInStore });

      if (isError) {
        alert('Виникла помилка, спробуйте пізніше...');
        logoutUtilFN();
      } else {
        alert('Ім`я було успішно змінено');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewSettingsWrap onSubmit={handleSubmit(handleInputNameChange)}>
      {/* <SettingsLabel variant="h5">Нове ім`я</SettingsLabel> */}
      <FieldText
        id="nickname"
        control={control}
        errors={errors.nickname}
        // placeholder={'Введіть нове ім`я'}
        label={'Введіть нове ім`я'}
        // helperText={'Нове ім`я'}
        // inputWidth={isMobile ? '300px' : isTabletAndHigher ? '400px' : '100%'}
      />
      <SaveChangeButton
        type="submit"
        label="Підтвердити"
        onSubmit={handleInputNameChange}
        disabled={!isValid || !isDirty}
      />
    </NewSettingsWrap>
  );
};

export default ChangeNameComponent;
