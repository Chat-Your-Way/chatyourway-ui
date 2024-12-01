import { useMediaQuery } from 'react-responsive';
import { Controller } from 'react-hook-form';
import { RadioGroup, RadioLabel, RadioInput } from './FieldRadio.styled';
import { Avatars } from '../../../ui-kit/images/avatars';
import Avatar from '../../../ui-kit/components/Avatar/Avatar';

export const FieldRadio = ({ id, control, avatarId }) => {
  const avatarsList = Object.entries(Avatars).map((item) => {
    return { id: item[0].replace('Avatar', ''), Logo: item[1] };
  });
  const isModile = useMediaQuery({ query: '(max-width: 480px)' });
  const checkedValue = avatarId ? avatarId.toString() : '3';

  const getSize = () => {
    if (isModile) {
      return 'md';
    } else {
      return 'lg';
    }
  };

  return (
    <Controller
      control={control}
      name="avatar"
      defaultValue={checkedValue ? checkedValue : '3'}
      render={({ field: { onChange, ...props } }) => (
        <RadioGroup id={id}>
          {avatarsList.map(({ id, Logo }) => {
            return (
              <RadioLabel key={id} htmlFor={id}>
                <RadioInput
                  id={id}
                  {...props}
                  type="radio"
                  onChange={onChange}
                  value={id}
                  label={id}
                  defaultChecked={id === checkedValue}
                />
                <div>
                  <Avatar size={getSize()}>
                    <Logo />
                  </Avatar>
                </div>
              </RadioLabel>
            );
          })}
        </RadioGroup>
      )}
    />
  );
};
