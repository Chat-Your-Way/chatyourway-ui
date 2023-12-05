import { useState } from 'react';
import { Box, ListItemIcon } from '@mui/material';
import IconButton from '../../../ui-kit/components/IconButton/IconButton';
import {
  IconMoreChat,
  MenuIconComplain,
  MenuIconSend,
  StyledMenu,
  StyledListItemText,
  CloseMenu,
  MenuItemBox,
  StyledListItem,
  StyledButtonMore,
} from './DropDownMenu.styled';

const DropDownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <StyledButtonMore onClick={handleClick} icon={<IconMoreChat />} />
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItemBox>
          <StyledListItem>
            <ListItemIcon>
              {<IconButton icon={<MenuIconSend />} />}
            </ListItemIcon>
            <StyledListItemText primary="Відповісти на це повідомлення" />
          </StyledListItem>
          <StyledListItem>
            <IconButton onClick={handleClose} icon={<CloseMenu />} />
          </StyledListItem>
        </MenuItemBox>
        <StyledListItem>
          <ListItemIcon>
            {<IconButton icon={<MenuIconComplain />} />}
          </ListItemIcon>
          <StyledListItemText primary="Поскаржитися на повідомлення" />
        </StyledListItem>
      </StyledMenu>
    </Box>
  );
};

export default DropDownMenu;
