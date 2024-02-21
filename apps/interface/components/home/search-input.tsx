import type { InputProps } from '@nextui-org/react';
import { Button, Input } from '@nextui-org/react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function SearchInput(props: InputProps) {
  const router = useRouter();

  return (
    <Input
      {...props}
      classNames={{
        input: 'text-medium',
        inputWrapper: 'pr-3 text-default-500 bg-default-400/20 dark:bg-default-500/20',
      }}
      endContent={
        <Button
          color='primary'
          isIconOnly
          onClick={() => {
            router.push('/search?q=asv');
          }}
          radius='full'
        >
          <IconArrowRight />
        </Button>
      }
      placeholder='Ask anything...'
      radius='full'
      size='lg'
      startContent={<IconSearch />}
      type='search'
    />
  );
}
