import { Controller } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { RadioGroup, RadioLabel, RadioInput } from './FieldRadio.styled';
import Avatar from '../../../ui-kit/components/Avatar/Avatar';
import { Avatars } from '../../../ui-kit/images/avatars';

export const FieldRadio = ({ id, control }) => {
  const avatarsList = Object.entries(Avatars).map((item) => {
    return { id: item[0].replace('Avatar', ''), Logo: item[1] };
  });
  const isTablet = useMediaQuery({ query: '(min-width: 834px)' });

  return (
    <Controller
      control={control}
      name="avatar"
      defaultValue={'3'}
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
                  defaultChecked={id === '3'}
                />
                <div>
                  <Avatar size={isTablet ? 'lg' : 'md'}>
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
