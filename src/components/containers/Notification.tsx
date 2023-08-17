'use client';

import React, { type FC, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { type Notification } from '~/utils/types';
import { useTimeoutFn } from 'react-use';

type NotificationInfo = {
  name: string;
  styles: {
    headerBg: string;
    bodyBg: string;
  };
};
const notification: {
  success: NotificationInfo;
  warning: NotificationInfo;
  error: NotificationInfo;
} = {
  success: {
    name: 'Success',
    styles: {
      headerBg: 'bg-success-500 ',
      bodyBg: 'bg-success-200',
    },
  },
  warning: {
    name: 'Warning',
    styles: {
      headerBg: 'bg-warning-500 ',
      bodyBg: 'bg-warning-200',
    },
  },
  error: {
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
  type,
  timeToRemove = 2500,
  removeFromList,
}) => {
  const aliveState = useRef<boolean | null>(null);
  const [isReady, cancel] = useTimeoutFn(
    () => removeFromList(id),
    timeToRemove,
  );

  // useEffect(() => {
  //   aliveState.current = isReady();
  // }, []);

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
      className={`max-w-screen mt-2 flex min-w-[50px] flex-col overflow-hidden rounded-lg bg-slate-300 sm:max-w-md`}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div
        id={`notification-header-${id}`}
        className={`text-light flex w-full items-center justify-between px-3 py-2 text-sm font-semibold sm:text-base ${notification[type].styles.headerBg}`}
      >
        <h1 className="">
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
      </div>
    </motion.li>
  );
};

export default Notification;
