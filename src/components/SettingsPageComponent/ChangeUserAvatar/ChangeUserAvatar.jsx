import { useForm } from 'react-hook-form';
import { FieldRadio } from '../../RegistrationPageComponent/FieldRadio/FieldRadio';
import {
  SaveChangeAvatarButton,
  UserAvatarForm,
} from './ChangeUserAvatar.styled';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../../redux/userSlice';
import { useEditUserInfoMutation } from '../../../redux/user-operations';

const ChangeUserAvatar = () => {
  const { nickname, avatarId } = useSelector(getUserInfo);
  const [editUserInfo] = useEditUserInfoMutation();

  const defaultValues = {
    nickname: nickname,
    avatar: avatarId,
  };

  const { handleSubmit, control, formState } = useForm({
    defaultValues: defaultValues,
    mode: 'onSubmit',
  });

  const changeAvatar = async (event) => {
    const value = {
      nickname: defaultValues.nickname,
      avatarId: event.avatar,
    };
    try {
      const { isError } = await editUserInfo(value);

      if (isError) {
        alert('Виникла помилка, спробуйте пізніше...');
      } else {
        alert('Аватар було успішно змінено');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserAvatarForm onSubmit={handleSubmit(changeAvatar)}>
      <FieldRadio
        id="avatar"
        control={control}
        avatarId={defaultValues.avatar}
      />
      <SaveChangeAvatarButton
        type="submit"
        label="Підтвердити"
        disabled={!formState.isDirty}
      />
    </UserAvatarForm>
  );
};

export default ChangeUserAvatar;
