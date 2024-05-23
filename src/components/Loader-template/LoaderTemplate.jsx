import { Box } from '@mui/material';
import {
  LoaderTemplateContentWrapper,
  LoaderTemplateLogoSpan,
  LoaderTemplateLogoSpanSecond,
  LoaderTemplateProgressBar,
  LoaderTemplateSVGAnimated,
} from './LoaderTemplateStyled';
import LoaderTemplateLogoSvg from '../../ui-kit/icons/logo/TeamChallengeLoaderLogo.svg';
import { useEffect, useState } from 'react';
import MainBackground from '../../ui-kit/components/MainBackground/MainBackground';

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
      <MainBackground
        $direction={'column'}
        $justifyContent={'center'}
        $alignItems="center"
      >
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
      </MainBackground>
    </Box>
  );
}

export default LoaderTemplate;
