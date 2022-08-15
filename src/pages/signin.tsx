import {
  CheckIcon,
  ClipboardIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import {
  ActionIcon,
  Button,
  CopyButton,
  Paper,
  PasswordInput,
  Popover,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { signIn } from '../API';

const CopyBtn = ({ value }: { value: string }) => {
  return (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
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
  );
};

const GuestUserLoginDetails = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      width={200}
      position="bottom-end"
      opened={opened}
      onChange={setOpened}
      shadow="md"
    >
      <Popover.Target>
        <InformationCircleIcon
          className="h-5 w-5 cursor-pointer"
          onClick={() => setOpened((o) => !o)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex justify-between">
          <Text size="sm">Username: guest</Text>
          <CopyBtn value="guest" />
        </div>
        <div className="flex justify-between">
          <Text size="sm">Password: password</Text>
          <CopyBtn value="password" />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { mutate } = useMutation(signIn, {
    onSuccess: () => {
      router.push('/');
    },
    onError: (err: AxiosError) => {
      if (err && err.response?.status === 401) {
        setError('Invalid username or password');
        return;
      }

      setError('Something went wrong');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ username, password });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      <Head>
        <title>Streamize - Sign in</title>
      </Head>

      <div className="flex justify-center overflow-hidden ">
        <Paper withBorder sx={{ position: 'relative' }}>
          <div className="absolute right-0 p-4">
            <GuestUserLoginDetails />
          </div>
          <span className="flex justify-center p-4 font-teko text-2xl  text-primary  ">
            Streamize
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex w-96 flex-col gap-2 py-10 px-6"
          >
            <TextInput
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              required
            />
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required
            />
            {error && (
              <p className="mt-4 w-full text-sm text-red-500">{error}</p>
            )}
            <Button color="red" mt={20} type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}
