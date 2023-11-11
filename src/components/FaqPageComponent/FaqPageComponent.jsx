import {
  FaqPageTitle,
  FaqPageWrapper,
  FaqAccordion,
  FaqAccordionDetails,
  AccordionList,
} from './FaqPageComponent.styled';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandIcon from '../../components/ExpandIcon';

const titlesAndTexts = [
  {
    title: 'How to block a message',
    text: 'How to block a message - asdfsdafagfasg',
  },
  {
    title: 'How to ban a user',
    text: 'How to ban a user - ffffffffffffff',
  },
  {
    title: 'How to complain to the chat',
    text: 'sad very sad',
  },
  {
    title:
      'Lorem ipsum dolor sii in ex eleifend, faucibus libero ac, lobortis leo.',
    text: 'Lorem ipsum dolor sit amet, conseckskdfksdf - sasdfsdsdfdsf',
  },
];

function FaqPageComponent() {
  return (
    <FaqPageWrapper>
      <FaqPageTitle variant="h2">The most common questions</FaqPageTitle>
      <AccordionList>
        {titlesAndTexts.map(({ title, text }, index) => (
          <FaqAccordion key={index}>
            <AccordionSummary expandIcon={<ExpandIcon />}>
              {title}
            </AccordionSummary>
            <FaqAccordionDetails>{text}</FaqAccordionDetails>
          </FaqAccordion>
        ))}
      </AccordionList>
    </FaqPageWrapper>
  );
}

export default FaqPageComponent;
