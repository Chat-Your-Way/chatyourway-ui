import { useSearchParams } from 'react-router-dom';
import { PATH } from '../../constans/routes';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import {
  LoginAccountButton,
  SuccessSignupTitle,
  SuccessSignupWrapper,
  Logo,
} from './SuccessSignupPageComponent.styled';
import { useActivateMutation } from '../../redux/auth-operations';
import { useEffect } from 'react';
import TextNavLinkButtonWithoutProps from '../../ui-kit/components/TextNavLinkButtonWithoutProps';

function SuccessSignupPageComponent() {
  const [searchParams] = useSearchParams();
  const activationToken = searchParams.get('token');

  const [activateEmail, { isError, isFetching, isSuccess }] =
    useActivateMutation();

  useEffect(() => {
    if (activationToken) {
      activateEmail({ activationToken });
    }
  }, [activationToken, activateEmail]);

  return (
    <WhiteLayout>
      <SuccessSignupWrapper>
        <Logo />
        <SuccessSignupTitle variant="h2">
          {isFetching
            ? 'Отримуємо інформацію...'
            : isError
            ? 'Щось пішло не так під час активації email'
            : isSuccess
            ? 'Ви успішно зареєструвались у ChatYourWay'
            : 'Чекаємо на активацію...'}
        </SuccessSignupTitle>
        {isError ? (
          <LoginAccountButton
            label="Увійти в акаунт"
            to={`${PATH.MAIN}${PATH.LOGIN}`}
            isDisabled={isError}
          />
        ) : (
          <TextNavLinkButtonWithoutProps
            to={`${PATH.MAIN}${PATH.LOGIN}`}
            label="Увійти в акаунт"
          />
        )}
      </SuccessSignupWrapper>
    </WhiteLayout>
  );
}

export default SuccessSignupPageComponent;
