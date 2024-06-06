import { SharedLayoutWrapper } from './MainBackground.styled';

const MainBackground = (props) => {
  const { children, ...restProps } = props;

  return <SharedLayoutWrapper {...restProps}>{children}</SharedLayoutWrapper>;
};

export default MainBackground;
