import { Oval } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrap>
      <Oval
        color="#40A2E3"
        strokeWidth="2"
        animationDuration="1"
        width="96"
        visible={true}
      />
    </LoaderWrap>
  );
};

export default Loader;
