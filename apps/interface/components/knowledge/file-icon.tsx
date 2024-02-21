import type { TablerIconsProps } from '@tabler/icons-react';
import {
  IconFileTypeCsv,
  IconFileTypeDoc,
  IconFileTypeDocx,
  IconFileTypePdf,
  IconFileTypeTxt,
} from '@tabler/icons-react';

export interface FileIconProps extends TablerIconsProps {
  extension: 'pdf' | 'csv' | 'txt' | 'doc' | 'docx';
}

export default function FileIcon({ extension, ...props }: FileIconProps) {
  switch (extension) {
    case 'pdf':
      return <IconFileTypePdf {...props} />;

    case 'csv':
      return <IconFileTypeCsv {...props} />;

    case 'txt':
      return <IconFileTypeTxt {...props} />;

    case 'doc':
      return <IconFileTypeDoc {...props} />;

    case 'docx':
      return <IconFileTypeDocx {...props} />;
  }
}
