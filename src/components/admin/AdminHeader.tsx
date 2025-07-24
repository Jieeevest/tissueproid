'use client';

import { useSession } from 'next-auth/react';

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
        <div className="flex items-center">
          <div className="text-sm text-gray-600 dark:text-gray-300 mr-4">
            {session?.user?.name || 'Admin User'}
          </div>
          <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}