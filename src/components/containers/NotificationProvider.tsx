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
  component?: React.ReactNode,
) => void;

type NotifyTool = {
  notify: {
    success: NotifyHelperFunction;
    info: NotifyHelperFunction;
    warning: NotifyHelperFunction;
    error: NotifyHelperFunction;
  };
};

const NotificationContext = createContext<NotifyTool>({
  notify: {
    success: () => null,
    info: () => null,
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
    (
      message: string,
      title?: string,
      timeToRemove?: number,
      component?: React.ReactNode,
    ) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        component: component,
        type: 'success',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );
  const info = useCallback(
    (
      message: string,
      title?: string,
      timeToRemove?: number,
      component?: React.ReactNode,
    ) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        component: component,
        type: 'info',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );

  const warning = useCallback(
    (
      message: string,
      title?: string,
      timeToRemove?: number,
      component?: React.ReactNode,
    ) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        component: component,
        type: 'warning',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );

  const error = useCallback(
    (
      message: string,
      title?: string,
      timeToRemove?: number,
      component?: React.ReactNode,
    ) => {
      addNotification({
        id: uuid(),
        title: title,
        message: message,
        component: component,
        type: 'error',
        timeToRemove: timeToRemove,
      });
    },
    [],
  );

  const notify = { success, info, warning, error };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed right-[0.5rem] top-[4rem] z-30 pl-[0.5rem] sm:bottom-[2rem] sm:right-[2rem]">
        <ul>
          <AnimatePresence initial={false}>
            {notifications
              .map((notification) => (
                <Notification
                  id={notification.id}
                  key={notification.id}
                  type={notification.type}
                  title={notification.title}
                  message={notification.message}
                  component={notification.component}
                  timeToRemove={notification.timeToRemove}
                  removeFromList={removeNotification}
                />
              ))
              .reverse()}
          </AnimatePresence>
        </ul>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotificationContext = () => useContext(NotificationContext);
