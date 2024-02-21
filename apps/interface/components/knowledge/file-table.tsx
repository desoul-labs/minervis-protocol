import type { TableProps } from '@nextui-org/react';
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { IconEye, IconTrash } from '@tabler/icons-react';
import FileIcon from './file-icon';

const statusColorMap = {
  processing: 'warning',
  completed: 'success',
  failed: 'danger',
} as const;

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
  extension: 'pdf' | 'csv' | 'txt' | 'doc' | 'docx';
  size: number;
  date: Date;
  status: 'processing' | 'completed' | 'failed';
  price?: number;
}

const renderCell = (item: FileInfo, key: string | number): JSX.Element => {
  switch (key) {
    case 'name':
      return (
        <div className='flex flex-row items-center gap-1'>
          <FileIcon extension={item.extension} size={32} />
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>{item.name}</p>
            <p className='text-bold text-sm text-default-400'>{item.size} MB</p>
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

    case 'date':
      return (
        <p className='text-bold text-sm' suppressHydrationWarning>
          {item.date.toLocaleString()}
        </p>
      );

    case 'actions':
      return (
        <div className='relative flex items-center gap-2'>
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
  items: FileInfo[];
}

export default function FileTable({ items, ...props }: FileTableProps) {
  return (
    <Table {...props} aria-label='File list'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn align={column.uid === 'actions' ? 'center' : 'start'} key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
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
