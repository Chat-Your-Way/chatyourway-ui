import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import { useMediaQuery } from 'react-responsive';
import { PATH } from '../../constans/routes';
import {
  NotFoundWrapper,
  NotFoundTitle,
  NotFoundImg,
  NotFoundLinkWrapper,
  NotFoundLink,
} from './NotFoundPageComponent.styles';

function NotFoundPageComponent() {
  const isTablet = useMediaQuery({ query: '(min-width: calc(845px - 0.02px)' });

  return (
    <WhiteLayout padding={isTablet ? '0 50px' : '0 66px'}>
      <NotFoundWrapper>
        <NotFoundTitle variant={isTablet ? 'h2' : 'h3'}>
          Упс, сторінка не знайдена!
        </NotFoundTitle>
        <NotFoundImg />
        <NotFoundLinkWrapper>
          <NotFoundLink to={PATH.MAIN} label="На головну" />
        </NotFoundLinkWrapper>
      </NotFoundWrapper>
    </WhiteLayout>
  );
}

export default NotFoundPageComponent;
