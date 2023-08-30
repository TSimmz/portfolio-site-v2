import { useContext } from 'react';
import { NotificationContext } from '~/providers/NotificationProvider';

const useNotifications = () => useContext(NotificationContext);

export default useNotifications;
