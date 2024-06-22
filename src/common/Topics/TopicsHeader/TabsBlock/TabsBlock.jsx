import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
} from '../../../../redux/chatSlice';
import { StyledBox, StyledTabs, StyledTab } from './TabsBlock.styled';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsBlock = ({ active, setFilter }) => {
  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  const firstTabWidth = chatOpened ? '89px' : contactsOpened ? '66px' : '115px';
  const secondTabWidth = chatOpened
    ? '129px'
    : contactsOpened
    ? '97px'
    : '142px';
  const thirdTabWidth = chatOpened
    ? '144px'
    : contactsOpened
    ? '112px'
    : '145px';

  return (
    <StyledBox $chatOpened={chatOpened} $contactsOpened={contactsOpened}>
      <StyledTabs
        aria-label="chat tabs"
        chatOpened={chatOpened}
        contactsOpened={contactsOpened}
        value={active}
        onChange={(_, value) => setFilter(value)}
      >
        <StyledTab
          label="все"
          {...a11yProps(0)}
          tabWidth={firstTabWidth}
          tabNumber="1"
          firstTabPaddingX
          borderRight
          isActive={active === 'all'}
          value={'all'}
        />
        <StyledTab
          label="улюблене"
          {...a11yProps(1)}
          tabWidth={secondTabWidth}
          tabNumber="2"
          isActive={active === 'favourite'}
          value={'favourite'}
        />
        <StyledTab
          label="популярне"
          {...a11yProps(2)}
          tabWidth={thirdTabWidth}
          tabNumber="3"
          borderLeft
          isActive={active === 'popular'}
          value={'popular/public'}
        />
      </StyledTabs>
    </StyledBox>
  );
};

export default memo(TabsBlock);
