'use client';

import { IconCrystalBall } from '@tabler/icons-react';
import SearchInput from './search-input';

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-6 px-16 pb-16'>
      <div className='flex items-center'>
        <IconCrystalBall size={36} />
        <div className='ml-1 text-center text-4xl'>Minervis</div>
      </div>
      <SearchInput className='h-16' />
    </main>
  );
}
