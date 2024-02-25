import type { InputProps } from '@nextui-org/react';
import { Button, Input } from '@nextui-org/react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchInput(props: InputProps): JSX.Element {
  const router = useRouter();
  const [query, setQuery] = useState<string>();

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
          isDisabled={!query}
          isIconOnly
          onClick={() => {
            router.push(`/search?q=${query}`);
          }}
          radius='full'
        >
          <IconArrowRight />
        </Button>
      }
      onValueChange={setQuery}
      placeholder='Ask anything...'
      radius='full'
      size='lg'
      startContent={<IconSearch />}
      type='search'
    />
  );
}
