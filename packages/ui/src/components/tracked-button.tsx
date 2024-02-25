import { useMixpanel } from '@minervis-protocol/analytics/src/mixpanel';
import type { ButtonProps } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import type { FC } from 'react';

export interface TrackedButtonProps extends ButtonProps {
  eventName: string;
  eventProperties?: Record<string, unknown>;
}

export const TrackedButton: FC<TrackedButtonProps> = ({ children, eventName, eventProperties = {}, ...props }) => {
  const { track } = useMixpanel();
  return (
    <Button
      {...props}
      onClick={() => {
        track(eventName, eventProperties);
      }}
    >
      {children}
    </Button>
  );
};
