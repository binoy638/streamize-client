/* eslint-disable unicorn/no-nested-ternary */
import {
  CheckIcon,
  DotsVerticalIcon,
  TrashIcon,
  XIcon
} from '@heroicons/react/solid';
import { Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';
import React from 'react';
import { useMutation } from 'react-query';

import { deleteTorrent } from '../../API';
import {
  TorrentsListQuery,
  TorrentState
} from '../../generated/apolloComponents';
import { prettyTime } from '../../utils';

function TorrentList({
  data: { diskUsage, torrents }
}: {
  data: TorrentsListQuery;
}) {
  const notifications = useNotifications();

  const { mutate } = useMutation(deleteTorrent, {
    onSuccess: () => {
      notifications.showNotification({
        title: 'Torrent',
        message: 'successfully deleted torrent',
        color: 'teal',
        icon: <CheckIcon className="h-4 w-4" />
      });
    },
    onError: () => {
      notifications.showNotification({
        title: 'Torrent',
        message: 'something went wrong while deleting torrent',
        color: 'red',
        icon: <XIcon className="h-4 w-4" />
      });
    }
  });

  const deleteTorrentHandler = (slug: string) => {
    mutate(slug);
  };
  return (
    <div className="mt-4 lg:mt-6 flex flex-col gap-4 overflow-hidden text-secondaryText">
      <p>Total: {prettyBytes(diskUsage.size)}</p>
      <p>Free: {prettyBytes(diskUsage.free)}</p>

      {torrents.map(item => {
        return (
          <div className=" bg-gray-800 rounded pb-1 lg:pb-0 " key={item.slug}>
            <div className="flex ">
              <div className="flex flex-col grow">
                {item.status === TorrentState.Added ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <div className="bg-blue-700 ">Torrent Added</div>
                      <div className="my-auto px-2">
                        <DotsVerticalIcon
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => deleteTorrentHandler(item.slug)}
                        />
                      </div>
                    </div>
                    <div className="truncate">{item.magnet}</div>
                  </div>
                ) : item.status === TorrentState.Error ? (
                  <div>
                    <div className=" bg-gray-800 text-white flex">
                      Could not download
                      <div className="my-auto px-2">
                        <DotsVerticalIcon
                          className="h-5 w-5 cursor-pointer"
                          onClick={() => deleteTorrentHandler(item.slug)}
                        />
                      </div>
                    </div>
                    <div className="truncate">{item.magnet}</div>
                  </div>
                ) : item.status === TorrentState.Downloading ||
                  item.status === TorrentState.Processing ||
                  item.status === TorrentState.Done ? (
                  <>
                    <div className="flex-col justify-between items-center">
                      <Link href={`/${item.slug}`} passHref>
                        {/* <p className="truncate w-4/5 px-1 py-2 flex hover:underline cursor-pointer"> */}
                        <Text
                          lineClamp={2}
                          p={10}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.name}
                        </Text>
                        {/* </p> */}
                      </Link>
                      <Text p={10}>{prettyBytes(item.size!)}</Text>
                    </div>
                    {item.downloadInfo && (
                      <>
                        <div className="w-full bg-gray-200 rounded-full">
                          <div
                            className="bg-green-500 text-xs font-medium text-blue-100 text-center  leading-none "
                            style={{
                              width: `${Math.round(
                                item.downloadInfo.progress * 100
                              )}%`
                            }}
                          >
                            {Math.round(item.downloadInfo.progress * 100)}%
                          </div>
                        </div>
                        <div className="hidden lg:flex justify-start gap-4 ">
                          <p>
                            Download:
                            {prettyBytes(item.downloadInfo.downloadSpeed)}
                            /s
                          </p>
                          <p>
                            Upload: {prettyBytes(item.downloadInfo.uploadSpeed)}
                            /s
                          </p>
                          <p>
                            Time Remaining:
                            {prettyTime(item.downloadInfo.timeRemaining / 1000)}
                          </p>
                        </div>
                      </>
                    )}
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex">
              <TrashIcon
                className="ml-2 h-5 w-5 cursor-pointer mb-2"
                onClick={() => deleteTorrentHandler(item.slug)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TorrentList;
