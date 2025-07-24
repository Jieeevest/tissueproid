'use client';

import { SessionProvider } from 'next-auth/react';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}