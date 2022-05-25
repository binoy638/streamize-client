/* eslint-disable sonarjs/cognitive-complexity */
import { DownloadIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import prettyBytes from 'pretty-bytes';
import React from 'react';

import { IAddedTorrent } from '../../@types';
import { getDownloadLink } from '../../API';
import StatusIndicator from '../Common/StatusIndicator';

function Torrent({ data }: { data: IAddedTorrent }) {
  const router = useRouter();

  const handleClick = (torrentSlug: string, videoSlug: string) => {
    // if (data.status !== 'done') return;
    router.push(`/${torrentSlug}/${videoSlug}`);
  };

  return data.status === 'downloading' ||
    data.status === 'converting' ||
    data.status === 'done' ? (
    <div className="flex flex-col gap-4">
      <div className="justify-center text-xl border-b pb-4">
        <Tag header="Title" value={data.name} />
        <Tag header="Size" value={prettyBytes(data.size)} />
        <Tag header="Status" value={data.status} />
      </div>
      <div className="">
        <div className="flex flex-col gap-2">
          {data.files.map(item => {
            return (
              <div
                key={item.slug}
                className="bg-gray-700  rounded  flex flex-col overflow-hidden justify-between "
              >
                <div className="px-2 py-1 flex justify-between items-center">
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() => handleClick(data.slug, item.slug)}
                  >
                    {item.name}
                  </span>
                  {item.status === 'downloading' ? (
                    <StatusIndicator type="downloading" />
                  ) : item.status === 'converting' ? (
                    <StatusIndicator type="converting" />
                  ) : item.status === 'done' ? (
                    <Link href={getDownloadLink(item.slug)} passHref>
                      <a>
                        <DownloadIcon className="h-5 w-5" />
                      </a>
                    </Link>
                  ) : null}
                </div>
                {item.status === 'downloading' && item?.downloadInfo ? (
                  <div className="w-full bg-gray-200 rounded-full">
                    <div
                      className="bg-green-500 text-xs font-medium text-blue-100 text-center h-1 leading-none "
                      style={{
                        width: `${Math.round(
                          item.downloadInfo?.progress * 100
                        )}%`
                      }}
                    ></div>
                  </div>
                ) : item.status === 'converting' && item?.convertStatus ? (
                  <div className="w-full bg-gray-200 rounded-full">
                    <div
                      className="bg-green-500 text-xs font-medium text-blue-100 text-center h-1 leading-none "
                      style={{
                        width: `${Math.round(
                          item.convertStatus.progress * 100
                        )}%`
                      }}
                    ></div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>Torrent added, no info yet</div>
  );
}

export default Torrent;

const Tag = ({ header, value }: { header: string; value: string }) => {
  return (
    <div className="flex gap-4">
      <span className="font-bold text-gray-300">{header}:</span> {value}
    </div>
  );
};