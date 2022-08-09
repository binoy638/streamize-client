/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import React from 'react';

import { addMagnetLink } from '../API';

interface Props {
  successMessage: string;
  onSuccessAction?: () => void;
  onErrorAction?: () => void;
}

const useAddMagnet = ({
  successMessage,
  onSuccessAction,
  onErrorAction,
}: Props) => {
  return useMutation(addMagnetLink, {
    onSuccess: () => {
      onSuccessAction && onSuccessAction();
      showNotification({
        message: successMessage,
        color: 'teal',
        icon: <CheckIcon className="h-4 w-4" />,
      });
    },
    onError: (error: AxiosError<{ error: { message: string } }>) => {
      onErrorAction && onErrorAction();
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

export default useAddMagnet;
