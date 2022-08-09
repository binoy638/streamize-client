import React from 'react';

import BlockRotateSvg from './BlockRotateSvg';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BlockRotateSvg height={80} width={80} fill="#FF0A0A" />
    </div>
  );
};

export default Loader;
