import { useEffect, useState } from 'react';
import {
  usePermitPrivateMessageMutation,
  useProhibitPrivateMessageMutation,
} from '../../../redux/user-operations';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../../redux/userSlice';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';

export const PermissionPrivateMessage = () => {
  const { hasPermissionSendingPrivateMessage } = useSelector(getUserInfo);
  const [isPermission, setIsPermission] = useState(
    hasPermissionSendingPrivateMessage || 'true',
  );
  const accessTokenInStore = useSelector(selectAccessToken);

  const [permitPrivateMessage] = usePermitPrivateMessageMutation();
  const [prohibitPrivateMessage] = useProhibitPrivateMessageMutation();

  const togglePermissionRequest = async () => {
    try {
      if (isPermission === 'false') {
        await permitPrivateMessage(accessTokenInStore);
      } else {
        await prohibitPrivateMessage(accessTokenInStore);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePermission = () => {
    setIsPermission((prevState) => (prevState === 'true' ? 'false' : 'true'));
    togglePermissionRequest();
  };

  useEffect(() => {
    setIsPermission(String(hasPermissionSendingPrivateMessage) || 'true');
  }, [hasPermissionSendingPrivateMessage]);

  return { isPermission, togglePermission };
};
