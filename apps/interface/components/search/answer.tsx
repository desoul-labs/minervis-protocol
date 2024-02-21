'use client';

import { Button, Divider } from '@nextui-org/react';
import { IconReload } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

export default function Answer() {
  const searchParams = useSearchParams();
  const sourceLinks = ['http://google.co.jp'];
  const answer = 'This is the answer';
  const done = true;

  return (
    <div className='max-w-[800px] space-y-4 px-8 py-16 pb-32 sm:px-24 sm:pt-16'>
      <div className='overflow-auto text-2xl sm:text-4xl'>{searchParams.get('q')}</div>

      <div className='text-md text-primary'>Answer</div>
      <div className='mt-2 overflow-auto'>{replaceSourcesWithLinks(answer, sourceLinks)}</div>

      <Divider className='my-2' />

      {done ? (
        <>
          <div className='text-md text-primary'>Sources</div>

          {sourceLinks.map((source, index) => (
            <div className='mt-1 overflow-auto' key={index}>
              {`[${index + 1}] `}
              <a
                className='hover:cursor-pointer hover:underline'
                href={source}
                rel='noopener noreferrer'
                target='_blank'
              >
                {source.split('//')[1]?.split('/')[0]?.replace('www.', '')}
              </a>
            </div>
          ))}

          <Divider className='my-2' />

          <Button color='primary'>
            <IconReload size={18} />
            Ask New Question
          </Button>
        </>
      ) : null}
    </div>
  );
}

const replaceSourcesWithLinks = (answer: string, sourceLinks: string[]) => {
  const elements = answer.split(/(?<temp1>\[[0-9]+\])/).map((part, index) => {
    if (/\[[0-9]+\]/.test(part)) {
      const link = sourceLinks[parseInt(part.replace(/[[\]]/g, '')) - 1];

      return (
        <a
          className='text-blue-500 hover:cursor-pointer'
          href={link}
          key={index}
          rel='noopener noreferrer'
          target='_blank'
        >
          {part}
        </a>
      );
    }
    return part;
  });

  return elements;
};
