import { useSelector } from 'react-redux';
import { getUserInfo } from '../../../redux/userSlice';
import { useEditUserInfoMutation } from '../../../redux/user-operations';
import { NewSettingsWrap, SaveChangeButton } from './ChangeNameInput.styled';
import { FieldText } from '../../RegistrationPageComponent/FieldText/FieldText';
import { useForm } from 'react-hook-form';
import { SettingsLabel } from '../SettingsPageComponent.styled';

const ChangeNameInput = () => {
  const { nickname, avatarId } = useSelector(getUserInfo);

  const [editUserInfo] = useEditUserInfoMutation();

  const defaultValues = {
    nickname: nickname,
    avatar: avatarId,
  };

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ defaultValues: defaultValues, mode: 'onChange' });

  const handleInputNameChange = async (event) => {
    const value = {
      nickname: event.nickname,
      avatarId: defaultValues.avatar,
    };

    try {
      if (value.nickname === nickname) {
        alert('Ім`я не змінилося. Введіть нове ім`я для збереження');
        return;
      }
      const { isError } = await editUserInfo(value);

      if (isError) {
        alert('Виникла помилка, спробуйте пізніше...');
      } else {
        alert('Ім`я було успішно змінено');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewSettingsWrap onSubmit={handleSubmit(handleInputNameChange)}>
      <SettingsLabel variant="h5">Нове ім`я</SettingsLabel>
      <FieldText
        id="nickname"
        control={control}
        errors={errors.nickname}
        placeholder={'Введіть нове ім`я'}
      />
      <SaveChangeButton
        type="submit"
        label="Підтвердити"
        onSubmit={handleInputNameChange}
        disabled={!isValid}
      />
    </NewSettingsWrap>
  );
};

export default ChangeNameInput;
