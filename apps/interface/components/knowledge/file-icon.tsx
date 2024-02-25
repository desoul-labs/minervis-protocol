import type { TablerIconsProps } from '@tabler/icons-react';
import {
  IconFileTypeCsv,
  IconFileTypeDoc,
  IconFileTypeDocx,
  IconFileTypePdf,
  IconFileTypeTxt,
} from '@tabler/icons-react';

export interface FileIconProps extends TablerIconsProps {
  contentType: string;
}

export default function FileIcon({ contentType, ...props }: FileIconProps): JSX.Element {
  switch (contentType) {
    case 'application/pdf':
      return <IconFileTypePdf {...props} />;

    case 'text/csv':
      return <IconFileTypeCsv {...props} />;

    case 'text/plain':
      return <IconFileTypeTxt {...props} />;

    case 'application/msword':
      return <IconFileTypeDoc {...props} />;

    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <IconFileTypeDocx {...props} />;

    case 'text/markdown':
      return <IconFileTypeTxt {...props} />;

    default:
      return <></>;
  }
}
