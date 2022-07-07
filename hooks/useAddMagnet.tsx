import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useNotifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';

import { addMagnetLink } from '../API';

interface Props {
  successMessage: string;
  onSuccessAction?: () => void;
  onErrorAction?: () => void;
}

const useAddMagnet = ({
  successMessage,
  onSuccessAction,
  onErrorAction
}: Props) => {
  const notifications = useNotifications();

  return useMutation(addMagnetLink, {
    onSuccess: () => {
      onSuccessAction && onSuccessAction();
      notifications.showNotification({
        message: successMessage,
        color: 'teal',
        icon: <CheckIcon className="h-4 w-4" />
      });
    },
    onError: (error: AxiosError) => {
      onErrorAction && onErrorAction();
      const errMsg =
        error.response?.data?.error?.message ||
        'something went wrong while adding to queue';
      notifications.showNotification({
        message: errMsg,
        color: 'red',
        icon: <XIcon className="h-4 w-4" />
      });
    }
  });
};

export default useAddMagnet;
