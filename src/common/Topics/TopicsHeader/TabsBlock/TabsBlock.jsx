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
  handleChange,
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
        onChange={handleChange}
      >
        <StyledTab
          label="все"
          {...a11yProps(0)}
          tabWith={firstTabWidth}
          firstTabPaddingX
          borderRight
          isActive
        />
        <StyledTab
          label="улюблене"
          {...a11yProps(1)}
          tabWith={secondTabWidth}
        />
        <StyledTab
          label="популярне"
          {...a11yProps(2)}
          tabWith={thirdTabWidth}
          borderLeft
        />
      </StyledTabs>
    </StyledBox>
  );
};

export default memo(TabsBlock);
