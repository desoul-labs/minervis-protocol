import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { api } from '@minervis-protocol/server';
import type { Id } from '@minervis-protocol/server/src/api/_generated/dataModel';
import type { ModalProps } from '@nextui-org/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useMutation } from 'convex/react';
import { useForm } from 'react-hook-form';

export interface FileUploadFormInput {
  files: FileList | null;
}

export default function FileUploadModal(props: Omit<ModalProps, 'children'>) {
  const generateUploadUrl = useMutation(api.api.files.mutation.generateUploadUrl);
  const saveFile = useMutation(api.api.files.mutation.saveFile);
  const { primaryWallet } = useDynamicContext();
  const { register, handleSubmit, formState } = useForm<FileUploadFormInput>({ mode: 'onChange' });

  const onSubmit = async (input: FileUploadFormInput, onClose: () => void) => {
    if (!primaryWallet?.address) {
      throw new Error('No account connected');
    }

    const file = input.files?.[0];
    if (!file) {
      throw new Error('No file selected');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB');
    }

    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    const { storageId } = (await result.json()) as { storageId: Id<'_storage'> };
    await saveFile({ storageId, name: file.name, address: primaryWallet.address });

    onClose();
  };

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit((formData) => onSubmit(formData, onClose))}>
            <ModalHeader className='flex flex-col gap-1'>New Knowledge</ModalHeader>
            <ModalBody>
              <Input
                accept='.pdf,.docx,.txt,.csv,.md'
                classNames={{
                  input:
                    'block w-full text-sm rounded-lg cursor-pointer file:cursor-pointer file:mr-4 file:h-full file:px-4 file:border-0 file:text-sm file:bg-primary file:text-white',
                  inputWrapper: 'p-0',
                }}
                description='PDF, DOCX, TXT or CSV (MAX 10MB)'
                label='Upload file'
                labelPlacement='outside'
                placeholder='Choose File'
                type='file'
                {...register('files', { required: true })}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' onPress={onClose} variant='light'>
                Cancel
              </Button>
              <Button color='primary' isDisabled={!formState.isValid} isLoading={formState.isSubmitting} type='submit'>
                Submit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
