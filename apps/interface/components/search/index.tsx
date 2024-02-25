'use client';

import { api } from '@minervis-protocol/server';
import { useAction } from 'convex/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Answer from './answer';

export default function Search(): JSX.Element {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  if (!query) {
    redirect('/');
  }

  const querySearch = useAction(api.search.action.querySearch);
  const [answer, setAnswer] = useState<string>();

  useEffect(() => {
    void querySearch({ query }).then((result) => {
      setAnswer(result);
    });
  }, [querySearch, query]);

  return <Answer answer={answer ?? ''} isLoading={Boolean(answer)} query={query} sourceLinks={[]} />;
}
