'use client';

import React, {
  createContext,
  useContext,
  type ReactNode,
  type FC,
  useCallback,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useNotifications from '~/hooks/useNotifications';
import { v4 as uuid } from 'uuid';

type NotifyHelperFunction = (title: string, message: string) => void;
type NotifyTool = {
  notify: {
    success: NotifyHelperFunction;
    warning: NotifyHelperFunction;
    error: NotifyHelperFunction;
  };
};

const NotificationContext = createContext<NotifyTool>({
  notify: {
    success: (title: string, message: string) => null,
    warning: (title: string, message: string) => null,
    error: (title: string, message: string) => null,
  },
});

type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const { notifications, addNotification, removeNotification } =
    useNotifications();

  const success = useCallback((title: string, message: string) => {
    console.log('SUCCESS NOTIFICATION');
    addNotification({
      id: uuid(),
      title: title,
      message: message,
      type: 'success',
    });
  }, []);

  const warning = useCallback((title: string, message: string) => {
    console.log('WARNING NOTIFICATION');
    addNotification({
      id: uuid(),
      title: title,
      message: message,
      type: 'warning',
    });
  }, []);

  const error = useCallback((title: string, message: string) => {
    console.log('ERROR NOTIFICATION');
    addNotification({
      id: uuid(),
      title: title,
      message: message,
      type: 'error',
    });
  }, []);

  const notify = { success, warning, error };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-[2rem] right-[2rem]">
        <ul>
          <AnimatePresence initial={false}>
            {notifications.map((notification) => (
              <motion.li
                key={notification.id}
                className={`${
                  notification.type === 'success'
                    ? 'bg-success-500'
                    : notification.type === 'warning'
                    ? 'bg-warning-500'
                    : 'bg-error-500'
                } mt-1 px-4 py-3`}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="close"
                >
                  <svg width="23" height="23" viewBox="0 0 23 23">
                    <motion.path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="hsl(0, 0%, 18%)"
                      strokeLinecap="round"
                      d="M 3 16.5 L 17 2.5"
                    />
                    <motion.path
                      fill="transparent"
                      strokeWidth="3"
                      stroke="hsl(0, 0%, 18%)"
                      strokeLinecap="round"
                      d="M 3 2.5 L 17 16.346"
                    />
                  </svg>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotificationContext = () => useContext(NotificationContext);
