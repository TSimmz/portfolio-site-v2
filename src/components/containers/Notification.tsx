'use client';

import React, { type FC } from 'react';
import { motion } from 'framer-motion';
import { type Notification } from '~/utils/types';
import { useTimeoutFn } from 'react-use';

type NotificationInfo = {
  emoji: string;
  name: string;
  styles: {
    headerBg: string;
    bodyBg: string;
  };
};
const notification: {
  success: NotificationInfo;
  info: NotificationInfo;
  warning: NotificationInfo;
  error: NotificationInfo;
} = {
  success: {
    emoji: '🚀',
    name: 'Success',
    styles: {
      headerBg: 'bg-success-500 ',
      bodyBg: 'bg-success-200',
    },
  },
  info: {
    emoji: '💁‍♂️',
    name: 'Info',
    styles: {
      headerBg: 'bg-info-500 ',
      bodyBg: 'bg-info-200',
    },
  },
  warning: {
    emoji: '😬',
    name: 'Warning',
    styles: {
      headerBg: 'bg-warning-500 ',
      bodyBg: 'bg-warning-200',
    },
  },
  error: {
    emoji: '🤬',
    name: 'Error',
    styles: {
      headerBg: 'bg-error-500 ',
      bodyBg: 'bg-error-200',
    },
  },
};

type NotificationProps = Notification & {
  removeFromList: (id: string) => void;
};
const Notification: FC<NotificationProps> = ({
  id,
  title = '',
  message,
  component,
  type,
  timeToRemove = 2500,
  removeFromList,
}) => {
  const isTimeoutDisabled = timeToRemove !== 0;
  const timeoutFn = isTimeoutDisabled ? () => removeFromList(id) : () => null;
  const timeoutValue = isTimeoutDisabled ? timeToRemove : 1000;

  const [cancel] = useTimeoutFn(timeoutFn, timeoutValue);

  if (isTimeoutDisabled) {
    cancel();
  }

  console.table({ id, title, message, type, component });

  const handleCloseNotification = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    cancel();
    removeFromList(id);
  };

  return (
    <motion.li
      key={`notification-${type}-${id}`}
      id={`notification-${type}-${id}`}
      className={`max-w-screen mt-2 flex min-w-[100px] flex-col overflow-hidden rounded-lg bg-slate-300 sm:max-w-lg`}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div
        id={`notification-header-${id}`}
        className={`text-light flex w-full items-center justify-between px-3 py-2 text-sm font-semibold sm:text-base ${notification[type].styles.headerBg}`}
      >
        <h1 className="text-dark-base">
          <span>{notification[type].emoji}</span>{' '}
          <span>{notification[type].name}</span>{' '}
          {title ? (
            <>
              {': '} <span className="font-semibold sm:text-base">{title}</span>
            </>
          ) : null}
        </h1>
        <motion.button
          onClick={handleCloseNotification}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center rounded-lg p-1 hover:backdrop-brightness-125"
        >
          <motion.svg className="h-5 w-5" viewBox="0 0 24 24">
            <motion.path
              name={'close-A'}
              fill="none"
              strokeWidth="2.2"
              d="M6 18 L18 6"
              className="stroke-light"
            />
            <motion.path
              name={'close-B'}
              fill="none"
              strokeWidth="2.2"
              d="M6 6 L18 18"
              className="stroke-light"
            />
          </motion.svg>
        </motion.button>
      </div>
      <div
        className={`flex w-full flex-col px-3 py-2 text-neutrals-700 ${notification[type].styles.bodyBg}`}
      >
        <p className="text-xs italic sm:text-sm">{`> ${message}`}</p>
        {component ? (
          <div className="flex w-full justify-center py-2">{component}</div>
        ) : null}
      </div>
    </motion.li>
  );
};

export default Notification;
