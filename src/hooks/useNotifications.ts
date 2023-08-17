import { useState } from 'react';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error';
};

function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((previousNotifications) => [
      ...previousNotifications,
      notification,
    ]);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications((previousNotifications) => {
      const tempNotifications = [...previousNotifications];
      tempNotifications.splice(
        tempNotifications.findIndex(
          (notification) => notification.id === notificationId,
        ),
        1,
      );
      return tempNotifications;
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
}

export default useNotifications;
