import { type FC } from 'react';

import NotificationProvider from './NotificationProvider';
import ThemeProvider from './ThemeProvider';
import ViewPortProvider from './ViewPortProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ViewPortProvider>{children}</ViewPortProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default Providers;
