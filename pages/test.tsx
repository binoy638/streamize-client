import {
  ClockIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  FilmIcon,
  SaveIcon,
  ServerIcon,
  TrashIcon
} from '@heroicons/react/solid';
import { Box, Menu, Progress, Text } from '@mantine/core';
import React from 'react';

import ItemWithIcon from '../components/Common/ItemWithIcon';

const Options = () => {
  return (
    <Menu control={<DotsHorizontalIcon className="w-4 h-4" />}>
      <Menu.Item icon={<TrashIcon className="w-4 h-4" />}>Delete</Menu.Item>
    </Menu>
  );
};

const TorrentItem = () => {
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colors.gray[2],
        cursor: 'pointer'
      })}
    >
      <div className="absolute right-0 p-2">
        <Options />
      </div>

      <div className="flex p-4 gap-4 items-center">
        <div>
          <FilmIcon className="w-14 h-14" />
          <div>
            <Progress color="green" size="xs" radius={0} value={50} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Text>Naruto - Episode 12</Text>
          <div className="flex gap-4">
            <ItemWithIcon
              icon={<ServerIcon className="w-4 h-4" />}
              title={`350MB / 1.2GB`}
            />
            <ItemWithIcon
              icon={<ClockIcon className="w-4 h-4" />}
              title={`52s`}
            />
            <ItemWithIcon
              icon={<DownloadIcon className="w-4 h-4" />}
              title={`1MB/s`}
            />

            <ItemWithIcon
              icon={<SaveIcon className="w-4 h-4" />}
              title={'Downloading (50%)'}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

const Test = () => {
  return (
    <div>
      <TorrentItem />
    </div>
  );
};

export default Test;
