import { useEffect, useState } from 'react';
import {
  usePermitPrivateMessageMutation,
  useProhibitPrivateMessageMutation,
} from '../../../redux/user-operations';

export const PermissionPrivateMessage = () => {
  const [isPermission, setIsPermission] = useState(
    localStorage.getItem('permission') || 'true',
  );

  const [permitPrivateMessage] = usePermitPrivateMessageMutation();
  const [prohibitPrivateMessage] = useProhibitPrivateMessageMutation();

  const togglePermissionRequest = async () => {
    try {
      if (isPermission === 'false') {
        await permitPrivateMessage();
      } else {
        await prohibitPrivateMessage();
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
    localStorage.setItem('permission', isPermission);
  }, [isPermission]);

  return { isPermission, togglePermission };
};
