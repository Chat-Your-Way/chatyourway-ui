import {
  FaqPageTitle,
  FaqPageWrapper,
  FaqAccordion,
  FaqAccordionDetails,
  AccordionList,
  FaqAccordionTitle,
  FaqAccordionText,
  FaqAccordionSummary,
} from './FaqPageComponent.styled';
import ExpandIcon from '../../components/ExpandIcon';

const titlesAndTexts = [
  {
    title: 'Як заблокувати повідомлення?',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    title: 'Як забанити користувача?',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    title: 'Як поскаржитися в чаті?',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
];

function FaqPageComponent() {
  return (
    <FaqPageWrapper>
      <FaqPageTitle variant="h2">Найпоширеніші питання</FaqPageTitle>
      <AccordionList>
        {titlesAndTexts.map(({ title, text }, index) => (
          <FaqAccordion key={index}>
            <FaqAccordionSummary expandIcon={<ExpandIcon />}>
              <FaqAccordionTitle variant="h5">{title}</FaqAccordionTitle>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <FaqAccordionText variant="h5">{text}</FaqAccordionText>
            </FaqAccordionDetails>
          </FaqAccordion>
        ))}
      </AccordionList>
    </FaqPageWrapper>
  );
}

export default FaqPageComponent;
