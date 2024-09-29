import { memo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  StyledModalBox,
  StyledForm,
  CloseButton,
  ConfirmButton,
  CloseIcon,
} from './NewTopic.styled';
import NewTopicInput from './NewTopicInput';
import { useCreateMutation } from '../../redux/topics-operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import localLogOutUtil from '../../utils/localLogOutUtil';

const defaultValues = {
  topicName: '',
  tags: '',
};

function NewTopic({ closeModal }) {
  const [create] = useCreateMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: defaultValues });

  const dispatch = useDispatch();
  const accessTokenInStore = useSelector(selectAccessToken);

  const [topicName, setTopicName] = useState();
  const [tags, setTags] = useState();

  const isErrorsInForm = Object.keys(errors).length !== 0;

  const onChangeInputTopicNameHandler = (event) => {
    setTopicName(event.target.value);
  };

  const onChangeInputTopicTagHandler = (event) => {
    setTags(event.target.value);
  };

  const onSubmit = async (values) => {
    const { topicName, tags } = values;
    const formattedTags = tags
      .trim()
      .split(' ')
      .filter((el) => (el !== '') & (el !== '#'));
    const newTopic = { topicName: topicName.trim(), tags: formattedTags };
    try {
      const { data } = await create({ newTopic, accessTokenInStore });
      if (data) {
        closeModal();
        alert(`Тема "${data.name}" успішно створена`);
      } else {
        alert('Виникла помилка під час створення теми');
        localLogOutUtil(dispatch);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkedValueTopicName = (value) => {
    const isValidTopicName = new RegExp(
      '^[A-Za-zА-Яа-я0-9ії -!%:_+=?.()s]{1,70}$',
    ).test(value);
    return isValidTopicName || 'Using an inappropriate character';
  };

  const checkedValueTags = (value) => {
    const isValidTopicName = new RegExp('^[a-zA-Zа-яА-Я0-9ії #_]+$').test(
      value,
    );
    return isValidTopicName || 'Using an inappropriate character';
  };

  return (
    <StyledModalBox onClick={(e) => e.stopPropagation()}>
      <CloseButton icon={<CloseIcon />} handleClick={closeModal} />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="topicName"
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
            validate: { checkedValueTopicName },
          }}
          render={({ field, fieldState: { error } }) => (
            <NewTopicInput
              label="Hазва нової теми"
              placeholder="Маршрут для подорожі з улюбленцем"
              error={!!error}
              errorMessage={error ? error.message : null}
              value={topicName}
              onChangeHandler={onChangeInputTopicNameHandler}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="tags"
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
            validate: { checkedValueTags },
          }}
          render={({ field, fieldState: { error } }) => (
            <NewTopicInput
              label="Ключеві теги"
              placeholder="#подорожі #з_улюбленцем"
              value={tags}
              onChangeHandler={onChangeInputTopicTagHandler}
              error={!!error}
              errorMessage={error ? error.message : null}
              {...field}
              ref={null}
            />
          )}
        />
        <ConfirmButton
          label="Створити"
          type="submit"
          isError={isErrorsInForm}
        />
      </StyledForm>
    </StyledModalBox>
  );
}

export default memo(NewTopic);
