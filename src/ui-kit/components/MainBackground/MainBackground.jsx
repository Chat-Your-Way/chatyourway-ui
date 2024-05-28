import { SharedLayoutWrapper } from './MainBackground.styled';

const MainBackground = ({
  children,
  $direction,
  $justifyContent,
  $alignItems,
}) => {
  return (
    <SharedLayoutWrapper
      $direction={$direction}
      $justifyContent={$justifyContent}
      $alignItems={$alignItems}
    >
      {children}
    </SharedLayoutWrapper>
  );
};

export default MainBackground;
