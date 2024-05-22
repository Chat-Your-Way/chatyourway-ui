import { Box } from '@mui/material';
import {
  LoaderTemplateContentWrapper,
  LoaderTemplateLogoSpan,
  LoaderTemplateLogoSpanSecond,
  LoaderTemplateProgressBar,
  LoaderTemplateSVGAnimated,
  LoaderTemplateWrapper,
} from './LoaderTemplateStyled';
// import LoaderTemplateLogo from '../../ui-kit/icons/logo/TeamChallengeLoaderLogo.png';
import LoaderTemplateLogoSvg from '../../ui-kit/icons/logo/TeamChallengeLoaderLogo.svg';
import { useEffect, useState } from 'react';

function LoaderTemplate() {
  const [valueProgressBar, setValueProgressBar] = useState(0);

  const countProgressBar = () => {
    setValueProgressBar((prevState) => prevState + 1);
  };

  useEffect(() => {
    let timerId = null;

    if (valueProgressBar <= 100) {
      timerId = setInterval(countProgressBar, 100);
    } else if (valueProgressBar === 100) {
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [valueProgressBar]);

  return (
    <Box sx={{ fontFamily: 'Junge' }}>
      <LoaderTemplateWrapper>
        <LoaderTemplateContentWrapper>
          <LoaderTemplateLogoSpan>Chat</LoaderTemplateLogoSpan>
          <div style={{ position: 'relative' }}>
            <LoaderTemplateSVGAnimated src={LoaderTemplateLogoSvg} />
          </div>

          <LoaderTemplateLogoSpanSecond>Your Way</LoaderTemplateLogoSpanSecond>
          <LoaderTemplateProgressBar
            type="range"
            min={'0'}
            max={'100'}
            value={valueProgressBar}
            $valueProgressBar={valueProgressBar}
            readOnly={true}
          />
        </LoaderTemplateContentWrapper>
      </LoaderTemplateWrapper>
    </Box>
  );
}

export default LoaderTemplate;
