import { useForm } from 'react-hook-form';
import { FieldRadio } from '../../RegistrationPageComponent/FieldRadio/FieldRadio';
import {
  SaveChangeAvatarButton,
  UserAvatarForm,
} from './ChangeUserAvatar.styled';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/userSlice';
import { useEditUserInfoMutation } from '../../../redux/user-operations';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';

import { toast } from 'react-toastify';

const ChangeUserAvatar = ({ setIsChangeAvatarVisible }) => {
  const { nickname, avatarId } = useSelector(selectUserInfo);
  const [editUserInfo] = useEditUserInfoMutation();
  const accessTokenInStore = useSelector(selectAccessToken);

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
      const { isError } = await editUserInfo({ value, accessTokenInStore });

      if (isError) {
        // alert('Виникла помилка, спробуйте пізніше...');
        toast.error('Виникла помилка, спробуйте пізніше...');
      } else {
        // alert('Аватар було успішно змінено');
        toast.success('Аватар було успішно змінено');
        setIsChangeAvatarVisible(false);
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
