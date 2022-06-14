import { ClipboardIcon } from '@heroicons/react/outline';
import { ShareIcon, TrashIcon } from '@heroicons/react/solid';
import { Button, Drawer, Loader, Menu, Text, Tooltip } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FC, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useMutation } from 'react-query';

import { shareTorrent } from '../../API';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setShareDrawer } from '../../store/slice/UI.slice';

export const ExtraOptions = ({ torrentId }: { torrentId: string }) => {
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    dispatch(setShareDrawer({ isOpen: true, torrentId }));
  };

  return (
    <Menu>
      <Menu.Item icon={<ShareIcon className="w-4 h-4" />} onClick={handleClick}>
        Share
      </Menu.Item>
      <Menu.Item color="red" icon={<TrashIcon className="w-4 h-4" />}>
        Delete
      </Menu.Item>
    </Menu>
  );
};

export const ExtraOptionsDrawer: FC = () => {
  const { mutate, isLoading, isError } = useMutation(shareTorrent, {
    onSuccess: data => {
      const link = `${window.location.host}/shared/${data}`;
      setShareLink(link);
    }
  });

  const [copied, setCopied] = useState(false);

  const [shareLink, setShareLink] = useState('');

  const dispatch = useTypedDispatch();

  const {
    shareDrawer: { isOpen, torrentId }
  } = useTypedSelector(state => state.UI);

  const handleDrawerClose = () => {
    dispatch(setShareDrawer({ isOpen: false, torrentId: '' }));
  };

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copied === true) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [copied]);

  useEffect(() => {
    if (!isOpen) {
      setDate(null);
      setShareLink('');
    }
  }, [isOpen]);

  const handleClick = () => {
    if (!date) return;
    mutate({
      torrent: torrentId,
      mediaId: torrentId,
      isTorrent: true,
      expiresIn: date
    });
  };
  return (
    <Drawer
      opened={isOpen}
      onClose={handleDrawerClose}
      position="bottom"
      padding="xl"
      size="50%"
    >
      <div className="flex">
        <DatePicker
          placeholder="Pick a date"
          label="Valid until"
          value={date}
          onChange={setDate}
          minDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
          required
        />
      </div>
      <Button
        mt={20}
        onClick={handleClick}
        disabled={!!isLoading}
        leftIcon={isLoading && <Loader size={'sm'} />}
      >
        Create
      </Button>
      {shareLink.length > 0 && (
        <div className="flex mt-4 border-2 rounded p-2 justify-between">
          <Text lineClamp={1} mr={10}>
            {'https://' + shareLink}
          </Text>
          <CopyToClipboard
            text={'https://' + shareLink}
            onCopy={() => setCopied(true)}
          >
            <Tooltip
              label="link copied"
              withArrow
              opened={copied}
              closeDelay={500}
            >
              <ClipboardIcon
                className="h-5 w-5 cursor-pointer"
                color={copied ? 'green' : 'gray'}
              />
            </Tooltip>
          </CopyToClipboard>
        </div>
      )}

      {isError && (
        <Text color={'red'} mt={10} size={'sm'}>
          Error
        </Text>
      )}
    </Drawer>
  );
};
