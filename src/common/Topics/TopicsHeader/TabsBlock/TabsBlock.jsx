import { memo } from 'react';
import { StyledBox, StyledTabs, StyledTab } from './TabsBlock.styled';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsBlock = ({
  isOpenChat = false,
  isOpenContacts = false,
  active,
  setFilter,
}) => {
  const firstTabWidth = isOpenChat ? '89px' : isOpenContacts ? '66px' : '115px';
  const secondTabWidth = isOpenChat
    ? '129px'
    : isOpenContacts
    ? '97px'
    : '142px';
  const thirdTabWidth = isOpenChat
    ? '144px'
    : isOpenContacts
    ? '112px'
    : '145px';

  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      <StyledTabs
        aria-label="chat tabs"
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        value={active}
        onChange={(_, value) => setFilter(value)}
      >
        <StyledTab
          label="все"
          {...a11yProps(0)}
          tabWith={firstTabWidth}
          firstTabPaddingX
          borderRight
          isActive={active === 'all'}
          value={'all'}
        />
        <StyledTab
          label="улюблене"
          {...a11yProps(1)}
          tabWith={secondTabWidth}
          isActive={active === 'favourite'}
          value={'favourite'}
        />
        <StyledTab
          label="популярне"
          {...a11yProps(2)}
          tabWith={thirdTabWidth}
          borderLeft
          isActive={active === 'popular'}
          value={'popular'}
        />
      </StyledTabs>
    </StyledBox>
  );
};

export default memo(TabsBlock);
