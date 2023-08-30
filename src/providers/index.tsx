import { type FC } from 'react';

import NotificationProvider from './NotificationProvider';
import ThemeProvider from './ThemeProvider';
import ViewPortProvider from './ViewPortProvider';
import ThreeAnimationProvider from './ThreeAnimationProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ViewPortProvider>
          <ThreeAnimationProvider>{children}</ThreeAnimationProvider>
        </ViewPortProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default Providers;
