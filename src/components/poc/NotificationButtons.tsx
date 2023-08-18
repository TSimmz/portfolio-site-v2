import React from 'react';
import { useNotificationContext } from '~/components/containers/NotificationProvider';

const NotificationButtons = () => {
  const { notify } = useNotificationContext();

  return (
    <div className="mt-[100px] flex gap-4">
      <button
        className="rounded-md bg-success-500 p-4 text-lg text-white"
        onClick={() =>
          notify.success(
            'This is a test of the success notification! It will close after 5 seconds',
            'Banana bread at work dude?!',
            5000,
          )
        }
      >
        CLICK ME
      </button>
      <button
        className="rounded-md bg-info-500 p-4 text-lg text-white"
        onClick={() =>
          notify.info(
            'This is a test of the info notification! It will close after 4 seconds',
            'Knowledge is key!',
            4000,
          )
        }
      >
        CLICK ME
      </button>
      <button
        className="rounded-md bg-warning-500 p-4 text-lg text-white"
        onClick={() =>
          notify.warning(
            'This is a test of the warning notification! It will close after 3 second',
            'Hide ya wife, hide ya husbuh, and hide ya kids!',
            3000,
          )
        }
      >
        CLICK ME
      </button>
      <button
        className="rounded-md bg-error-500 p-4 text-lg text-white"
        onClick={() =>
          notify.error(
            'This is a test of the error notification! Timeout is disabled. Click the X to close the notification',
            'Something has gone horribly wrong!',
            0,
          )
        }
      >
        CLICK ME
      </button>
    </div>
  );
};

export default NotificationButtons;
