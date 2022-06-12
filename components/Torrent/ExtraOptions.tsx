import { ShareIcon, TrashIcon } from '@heroicons/react/solid';
import { Menu } from '@mantine/core';

export const ExtraOptions = ({
  setOpenShareDrawer
}: {
  setOpenShareDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Menu>
      <Menu.Item
        icon={<ShareIcon className="w-4 h-4" />}
        onClick={() => setOpenShareDrawer(true)}
      >
        Share
      </Menu.Item>
      <Menu.Item color="red" icon={<TrashIcon className="w-4 h-4" />}>
        Delete
      </Menu.Item>
    </Menu>
  );
};
