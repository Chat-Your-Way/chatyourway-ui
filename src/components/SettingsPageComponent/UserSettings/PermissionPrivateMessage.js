import { useEffect, useState } from 'react';

export const PermissionPrivateMessage = () => {
  const [isPermission, setIsPermission] = useState(
    localStorage.getItem('permission') || 'true',
  );

  const togglePermission = () => {
    setIsPermission((prevState) => (prevState === 'true' ? 'false' : 'true'));
  };

  useEffect(() => {
    localStorage.setItem('permission', isPermission);
  }, [isPermission]);

  return { isPermission, togglePermission };
};
