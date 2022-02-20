import React from 'react';

import { TorrentData } from '../../../../@types/store';

function Results({ data }: { data: TorrentData[] }) {
  return (
    <div>
      {data.map(item => {
        return (
          <div key={item.name}>
            <a>{item.name}</a>
          </div>
        );
      })}
    </div>
  );
}

export default Results;
