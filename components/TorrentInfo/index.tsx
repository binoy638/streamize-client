import Link from 'next/link';
import React from 'react';

import { IAddedTorrent } from '../../@types';

function index({ data }: { data: IAddedTorrent }) {
  return data.status === 'downloading' ||
    data.status === 'converting' ||
    data.status === 'done' ? (
    <div className="">
      <div>{data.name}</div>
      <div>
        <div>Files</div>
        <div>
          {data.files.map(item => {
            return (
              <div key={item.slug}>
                <Link
                  href={{
                    pathname: '/[torrentSlug]/[videoSlug]',
                    query: { torrentSlug: data.slug, videoSlug: item.slug }
                  }}
                  passHref
                >
                  {item.name}
                </Link>
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

export default index;
