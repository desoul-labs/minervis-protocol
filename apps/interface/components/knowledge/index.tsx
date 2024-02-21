'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Button, Divider, useDisclosure } from '@nextui-org/react';
import { IconPlus } from '@tabler/icons-react';
import { useEffectOnce } from 'react-use';
import EarningsOverview from './earnings-overview';
import FileTable from './file-table';
import FileUploadModal from './file-upload-modal';

const files = [
  {
    id: '1',
    name: 'Good',
    extension: 'pdf',
    size: 5,
    price: 10,
    date: new Date(),
    status: 'processing',
  } as const,
];

export default function Knowledge(): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setShowAuthFlow, isAuthenticated, isFullyConnected } = useDynamicContext();

  useEffectOnce(() => {
    if (!isAuthenticated || !isFullyConnected) {
      setShowAuthFlow(true);
    }
  });

  return (
    <main className='flex flex-col px-2 pt-8'>
      <div className='flex items-end justify-between'>
        <EarningsOverview daily={1} total={100} />
        <Button color='primary' onPress={onOpen}>
          <IconPlus size={16} />
          New Knowledge
        </Button>
      </div>
      <Divider className='my-4' />
      <FileTable items={files} />
      <FileUploadModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </main>
  );
}
