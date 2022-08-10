import React from 'react';

import { AppbarLogo } from './AppbarLogo';
import { AppbarTabs } from './AppbarTabs';
import { AppbarUserMenu } from './AppbarUserMenu';

export const Appbar = () => {
  return (
    <div className="px-4 bg-primary-normal flex items-center justify-between h-16 shadow-md">
      <div className="flex h-full">
        <AppbarLogo />
        <AppbarTabs />
      </div>
      <AppbarUserMenu />
    </div>
  )
}
