import { api } from '@minervis-protocol/server';
import type { TableProps } from '@nextui-org/react';
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { IconEye, IconStar, IconTrash } from '@tabler/icons-react';
import { useQuery } from 'convex/react';
import FileIcon from './file-icon';

const statusColorMap = {
  processing: 'warning',
  completed: 'success',
  failed: 'danger',
  claimed: 'secondary',
} as Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'>;

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'PRICE', uid: 'price' },
  { name: 'STATUS', uid: 'status' },
  { name: 'DATE', uid: 'date' },
  { name: 'ACTIONS', uid: 'actions' },
];

export interface FileInfo {
  id: string;
  name: string;
  contentType: string;
  size: number;
  createdAt: number;
  status: string;
  price?: number;
}

const renderCell = (item: FileInfo, key: string | number): JSX.Element => {
  switch (key) {
    case 'name':
      return (
        <div className='flex flex-row items-center gap-1'>
          <FileIcon contentType={item.contentType} size={32} />
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>{item.name}</p>
            <p className='text-bold text-sm text-default-400'>{(item.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      );

    case 'price':
      return <p className='text-bold text-sm'>{item.price}</p>;

    case 'status':
      return (
        <Chip className='capitalize' color={statusColorMap[item.status]} size='sm' variant='flat'>
          {item.status}
        </Chip>
      );

    case 'createdAt':
      return (
        <p className='text-bold text-sm' suppressHydrationWarning>
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      );

    case 'actions':
      return (
        <div className='relative flex items-center gap-2'>
          <Tooltip content='Claim'>
            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
              <IconStar />
            </span>
          </Tooltip>
          <Tooltip content='View'>
            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
              <IconEye />
            </span>
          </Tooltip>
          <Tooltip color='danger' content='Delete file'>
            <span className='cursor-pointer text-lg text-danger active:opacity-50'>
              <IconTrash />
            </span>
          </Tooltip>
        </div>
      );

    default:
      return <p className='text-bold text-sm' />;
  }
};

export interface FileTableProps extends Omit<TableProps, 'children'> {
  address: string;
}

export default function FileTable({ address, ...props }: FileTableProps): JSX.Element {
  const files = useQuery(api.files.query.listFiles, { size: 10, address });

  return (
    <Table {...props} aria-label='File list'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn align={column.uid === 'actions' ? 'center' : 'start'} key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={files?.items ?? []}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              return <TableCell>{renderCell(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
