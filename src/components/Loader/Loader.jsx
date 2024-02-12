import { Oval } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrap>
      <Oval
        color="#ACADFF"
        secondaryColor="#ACADFF"
        strokeWidth="2"
        animationDuration="1"
        width="96"
        visible={true}
      />
    </LoaderWrap>
  );
};

export default Loader;
