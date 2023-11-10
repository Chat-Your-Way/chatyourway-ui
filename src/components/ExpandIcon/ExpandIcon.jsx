import { OpenIcon, CloseIcon, IconWrapper } from './ExpandIcon.styled';

const ExpandIcon = () => {
  return (
    <IconWrapper>
      <CloseIcon className="expandIconWrapper" />
      <OpenIcon className="collapsIconWrapper" />
    </IconWrapper>
  );
};

export default ExpandIcon;
