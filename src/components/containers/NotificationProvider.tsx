'use client';

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
  useCallback,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { type Notification as NotificationType } from '~/utils/types';
import { v4 as uuid } from 'uuid';
import Notification from './Notification';

type NotifyHelperFunction = (
  message: string,
  title?: string,
  timeToRemove?: number,
) => void;

type NotifyTool = {
  notify: {
    success: NotifyHelperFunction;
    warning: NotifyHelperFunction;
    error: NotifyHelperFunction;
  };
};

const NotificationContext = createContext<NotifyTool>({
  notify: {
    success: () => null,
    warning: () => null,
    error: () => null,
  },
});

type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (notification: NotificationType) => {
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

  const success = useCallback(
    (message: string, title?: string, timeToRemove?: number) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        type: 'success',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );

  const warning = useCallback(
    (message: string, title?: string, timeToRemove?: number) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        type: 'warning',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );

  const error = useCallback(
    (message: string, title?: string, timeToRemove?: number) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        type: 'error',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );

  const notify = { success, warning, error };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-[0.5rem] right-[0.5rem] pl-[0.5rem] sm:bottom-[2rem] sm:right-[2rem]">
        <ul>
          <AnimatePresence initial={false}>
            {notifications.map((notification) => (
              <Notification
                id={notification.id}
                key={notification.id}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                timeToRemove={notification.timeToRemove}
                removeFromList={removeNotification}
              />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotificationContext = () => useContext(NotificationContext);
