import {
  ClipboardIcon,
  DotsVerticalIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  ActionIcon,
  Button,
  CheckIcon,
  CopyButton,
  Drawer,
  Loader,
  Menu,
  Text,
  Tooltip,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { openConfirmModal } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useDeleteTorrent from '@/hooks/useDeleteTorrent';

import { shareTorrent } from '../../API';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setShareDrawer } from '../../store/slice/UI.slice';

export const ExtraOptions = ({
  torrentId,
  slug,
}: {
  torrentId: string;
  slug: string;
}) => {
  const dispatch = useTypedDispatch();

  const router = useRouter();

  const { mutate } = useDeleteTorrent({
    onSuccessAction: () => {
      router.push('/');
    },
  });

  const handleShare = () => {
    dispatch(setShareDrawer({ isOpen: true, torrentId }));
  };

  const handleDelete = useCallback(() => {
    openConfirmModal({
      children: (
        <Text size="sm">Are you sure you want to delete this torrent?</Text>
      ),
      withCloseButton: false,
      labels: { confirm: 'Yes', cancel: 'No' },
      centered: true,
      onConfirm: () => {
        mutate(slug);
      },
    });
  }, []);

  return (
    <Menu position="left-start">
      <Menu.Target>
        <DotsVerticalIcon className="h-4 w-4 cursor-pointer" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<ShareIcon className="h-4 w-4" />}
          onClick={handleShare}
        >
          Share
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<TrashIcon className="h-4 w-4" />}
          onClick={handleDelete}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export const ExtraOptionsDrawer = () => {
  const [shareLink, setShareLink] = useState('');

  const { mutate, isLoading, isError } = useMutation(shareTorrent, {
    onSuccess: (data) => {
      const link = `${window.location.host}/shared/${data}`;
      setShareLink(link);
    },
  });

  const dispatch = useTypedDispatch();

  const {
    shareDrawer: { isOpen, torrentId },
  } = useTypedSelector((state) => state.UI);

  const handleDrawerClose = () => {
    dispatch(setShareDrawer({ isOpen: false, torrentId: '' }));
  };

  const [date, setDate] = useState<Date | null>(null);

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
      expiresIn: date,
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
        <div className="mt-4 flex justify-between rounded border-2 p-2">
          <Text lineClamp={1} mr={10}>
            {`https://${shareLink}`}
          </Text>
          <CopyButton value={`https://${shareLink}`}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy'}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <ClipboardIcon className="h-4 w-4" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
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

// const ShareTorrentModal = () => {
//   return <div></div>;
// };
