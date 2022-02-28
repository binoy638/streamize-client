import { XIcon } from '@heroicons/react/solid';
import { Button, Chip, Chips, Group } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const notifications = useNotifications();
  return (
    <div>
      <Chips>
        <Chip value="react">React</Chip>
        <Chip value="ng">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
        <Chip value="vue">Vue</Chip>
      </Chips>
      <Group position="center">
        <Button
          variant="outline"
          onClick={() =>
            notifications.showNotification({
              title: 'Torrent',
              message: 'Something went wrong while adding to queue',
              color: 'red',
              icon: <XIcon className="h-4 w-4" />
            })
          }
        >
          Show notification
        </Button>
      </Group>
    </div>
  );
};

export default Home;
