import React from 'react';

import { TorrentData } from '../../../@types/store';

function Results({ data }: { data: TorrentData[] }) {
  return (
    <div>
      {data.map(item => {
        return (
          <div key={item.name}>
            <div>
              <div>{item.name}</div>
              <div className="flex gap-4">
                <div> {item.size}</div>
                <div className="text-green-500">{item.seeds}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Results;
