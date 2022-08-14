import { ExclamationCircleIcon, ServerIcon } from '@heroicons/react/outline';
import { Loader } from '@mantine/core';
import prettyBytes from 'pretty-bytes';
import React, { useEffect, useMemo, useState } from 'react';

import { useDiskUsageLazyQuery } from '@/generated/apolloComponents';

import ItemWithIcon from '../Common/ItemWithIcon';

const DiskUsage = () => {
  const [getDiskUsage, { loading, data, error }] = useDiskUsageLazyQuery();

  const [show, setShow] = useState(false);

  const displayUsage = useMemo(() => {
    if (loading) return <Loader size="xs" />;

    if (data)
      return (
        <ItemWithIcon
          icon={<ServerIcon className="h-4 w-4" />}
          title={`${prettyBytes(data.diskUsage.free)} / ${prettyBytes(
            data.diskUsage.size
          )}`}
        />
      );

    return <ExclamationCircleIcon className="h-4 w-4 text-red-500" />;
  }, [data, loading, error]);

  const handleClick = () => {
    getDiskUsage();
    setShow(!show);
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [show]);

  if (!show) {
    return (
      <div className="flex justify-end">
        <ServerIcon className="h-4 w-4 cursor-pointer" onClick={handleClick} />
      </div>
    );
  }
  return <div className="flex justify-end">{displayUsage}</div>;
};

export default DiskUsage;
