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

  const [activateEmail, { isError, isFetching }] = useActivateMutation();

  useEffect(() => {
    activateEmail({ activationToken });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WhiteLayout>
      <SuccessSignupWrapper>
        <Logo />
        <SuccessSignupTitle variant="h2">
          {isFetching
            ? 'Отримуємо інформацію...'
            : isError
            ? 'Щось пішло не так під час активації email'
            : 'Ви успішно зареєструвались у ChatYourWay'}
        </SuccessSignupTitle>
        {isError ? (
          <LoginAccountButton
            label="Увійти в акаунт"
            to={`${PATH.MAIN}${PATH.LOGIN}`}
            isDisabled={isError}
          />
        ) : (
          <TextNavLinkButtonWithoutProps to={`${PATH.MAIN}${PATH.LOGIN}`}>
            Увійти в акаунт
          </TextNavLinkButtonWithoutProps>
        )}
      </SuccessSignupWrapper>
    </WhiteLayout>
  );
}

export default SuccessSignupPageComponent;
