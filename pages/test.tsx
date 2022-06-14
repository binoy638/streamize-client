import { Button, Group, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import BlockRotateSvg from '../components/Common/BlockRotateSvg';
import { secondsToHHMMSS } from '../utils';

function Test() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <BlockRotateSvg height={80} width={80} fill="#FF0A0A" />
    </div>
  );
}

export default Test;
