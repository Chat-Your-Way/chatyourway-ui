import styled from '@emotion/styled';

export const UsersAvatarStyledWrapper = styled.div`
  justify-self: right;
  /* display: flex; */
`;

export const UsersAvatarStyledList = styled.ul`
  position: relative;
  display: flex;
  justify-content: right;
  /* flex-direction: row-reverse; */
  margin: 0;
  padding: 0;
  width: 94px;
  list-style: none;
  @media screen and (min-width: 768px) {
    width: 180px;
  }
  @media screen and (min-width: 1200px) {
    width: 220px;
  }
`;

export const UsersAvatarStyledLi = styled.li`
  position: relative;
  position: absolute;
  left: ${(p) => `${p.$left}px`};
`;
