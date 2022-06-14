import { Button, Group, Modal, Text } from '@mantine/core';
import React, { FC } from 'react';

import { secondsToHHMMSS } from '../../utils';

interface ContinueVideoModelProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setContinueVideo: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
}

const ContinueVideoModel: FC<ContinueVideoModelProps> = ({
  opened,
  setOpened,
  setContinueVideo,
  progress
}) => {
  const handleYes = () => {
    setContinueVideo(true);
    setOpened(false);
  };

  const handleNo = () => {
    setContinueVideo(false);
    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
        centered
      >
        <div>
          <Text size="md" weight="bold">
            Do you want to continue from where you left?
          </Text>
          <Text size="sm" color={'blue'} weight="bold">
            {secondsToHHMMSS(progress)}
          </Text>
        </div>

        <div className="flex gap-6 mt-4">
          <Button variant="outline" color={'blue'} onClick={handleYes}>
            Yes
          </Button>
          <Button variant="outline" color={'blue'} onClick={handleNo}>
            No
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ContinueVideoModel;
