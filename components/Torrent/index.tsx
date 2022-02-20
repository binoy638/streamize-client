import { DownloadIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';
import React from 'react';

import { IAddedTorrent } from '../../@types';
import { getDownloadLink } from '../../API';

function Torrent({ data }: { data: IAddedTorrent }) {
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
                className="bg-primary py-1 rounded px-1 flex justify-between items-center"
              >
                <Link
                  href={{
                    pathname: '/[torrent]/[video]',
                    query: { torrent: data.slug, video: item.slug }
                  }}
                  passHref
                >
                  <span className="hover:underline cursor-pointer">
                    {item.name}
                  </span>
                </Link>
                {data.status === 'done' && (
                  <Link href={getDownloadLink(item.slug)} passHref>
                    <a>
                      <DownloadIcon className="h-5 w-5" />
                    </a>
                  </Link>
                )}
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
