import { memo } from 'react';
import Avatar from '../../ui-kit/components/Avatar';
import { StyledBox, StyledChildrenBox } from './Contacts.styled';
import ContactItem from './ContactItem';
import { getContactData } from './getContactData';

const Contacts = ({ title }) => {
  const data = getContactData();

  const avatarContent = title.trim()[0] + title.trim().split(' ')[1][0];

  return (
    <StyledBox>
      <Avatar>{avatarContent.toUpperCase()}</Avatar>
      {data && (
        <StyledChildrenBox>
          {data.map((item) => {
            return <ContactItem key={item.id} data={item} />;
          })}
        </StyledChildrenBox>
      )}
    </StyledBox>
  );
};

export default memo(Contacts);
