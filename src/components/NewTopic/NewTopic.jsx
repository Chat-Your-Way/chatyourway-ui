import { memo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  StyledModalBox,
  StyledForm,
  CloseButton,
  ConfirmButton,
} from './NewTopic.styled';
import { ICONS } from '../../ui-kit/icons';
import NewTopicInput from './NewTopicInput';

function NewTopic({ closeModal }) {
  const { control, handleSubmit } = useForm({ mode: 'all' });

  const [inputName, setInputName] = useState();
  const [inputTag, setInputTag] = useState();

  const onChangeInputTopicNameHandler = (event) => {
    setInputName(event.target.value);
  };

  const onChangeInputTopicTagHandler = (event) => {
    setInputTag(event.target.value);
  };

  const onSubmit = () => {
    // after add data
    closeModal();
  };

  const checkedValueInputName = (value) => {
    const isValidTopicName = new RegExp(
      '^[A-Za-zА-Яа-я0-9!%:_+=?.()s]{1,70}$',
    ).test(value);
    return isValidTopicName || 'Using an inappropriate character';
  };

  const checkedValueInputTag = (value) => {
    const isValidTopicName = new RegExp('^[a-zA-Zа-яА-Я0-9#_]+$').test(value);
    return isValidTopicName || 'Using an inappropriate character';
  };

  return (
    <StyledModalBox onClick={(e) => e.stopPropagation()}>
      <CloseButton
        icon={<ICONS.CLOSE_SQUARE width={24} height={24} />}
        handleClick={closeModal}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Input is required',
            },
            minLength: {
              value: 2,
              message: 'Minimum length is 2',
            },
            maxLength: {
              value: 70,
              message: 'Max length is 70',
            },
            validate: { checkedValueInputName },
          }}
          render={({ field, fieldState: { error } }) => (
            <NewTopicInput
              label="Hазва нової теми"
              placeholder="Маршрут для подорожі з улюбленцем"
              error={!!error}
              errorMessage={error ? error.message : null}
              value={inputName}
              onChangeHandler={onChangeInputTopicNameHandler}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Input is required',
            },
            minLength: {
              value: 2,
              message: 'Minimum length is 2',
            },
            maxLength: {
              value: 30,
              message: 'Max length is 30',
            },
            validate: { checkedValueInputTag },
          }}
          render={({ field, fieldState: { error } }) => (
            <NewTopicInput
              label=" Ключеві теги"
              placeholder="#подорожі #з_улюбленцем"
              value={inputTag}
              onChangeHandler={onChangeInputTopicTagHandler}
              error={!!error}
              errorMessage={error ? error.message : null}
              {...field}
              ref={null}
            />
          )}
        />
        <ConfirmButton label="Створити" type="submit" />
      </StyledForm>
    </StyledModalBox>
  );
}

export default memo(NewTopic);
