import {
  FaqPageTitle,
  FaqPageWrapper,
  FaqAccordion,
  IconDown,
  FaqAccordionSummary,
  FaqAccordionDetails,
} from './FaqPage.styled';

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
    text: 'How to complain to the chat - fatsADTASDTATSDTASD',
  },
  {
    title:
      'Lorem ipsum dolor sii in ex eleifend, faucibus libero ac, lobortis leo.',
    text: 'Lorem ipsum dolor sit amet, conseckskdfksdf - sasdfsdsdfdsf',
  },
];

const FaqPage = () => {
  return (
    <FaqPageWrapper>
      <FaqPageTitle variant="h1">The most common questions</FaqPageTitle>
      {titlesAndTexts.map((item, index) => (
        <FaqAccordion key={index}>
          <FaqAccordionSummary expandIcon={<IconDown />}>
            {item.title}
          </FaqAccordionSummary>
          <FaqAccordionDetails>{item.text}</FaqAccordionDetails>
        </FaqAccordion>
      ))}
    </FaqPageWrapper>
  );
};

export default FaqPage;
