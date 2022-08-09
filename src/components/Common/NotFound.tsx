import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Text } from '@mantine/core';
import React from 'react';

interface NotFoundProps {
  title: string;
}

const NotFound = ({ title }: NotFoundProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex-col items-center justify-center ">
        <ExclamationCircleIcon className="h-48 w-48 " />
        <Text size="xl" weight={'bold'} align={'center'}>
          {title}
        </Text>
      </div>
    </div>
  );
};

export default NotFound;
