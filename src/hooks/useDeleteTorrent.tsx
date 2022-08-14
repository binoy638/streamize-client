import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import React from 'react';

import { deleteTorrent } from '../API';

interface Props {
  onSuccessAction?: () => void;
  onErrorAction?: () => void;
}

const useDeleteTorrent = ({ onSuccessAction, onErrorAction }: Props) => {
  return useMutation(deleteTorrent, {
    onSuccess: () => {
      if (onSuccessAction) onSuccessAction();

      showNotification({
        title: 'Torrent',
        message: 'Successfully deleted torrent',
        color: 'teal',
        icon: <CheckIcon className="h-4 w-4" />,
      });
    },
    onError: (error: AxiosError<{ error: { message: string } }>) => {
      if (onErrorAction) onErrorAction();
      const errMsg =
        error.response?.data?.error?.message ||
        'something went wrong while adding to queue';

      showNotification({
        message: errMsg,
        color: 'red',
        icon: <XIcon className="h-4 w-4" />,
      });
    },
  });
};

export default useDeleteTorrent;
