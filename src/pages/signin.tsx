import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { signIn } from '../API';

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
    <div className=" flex h-screen w-screen items-center justify-center">
      <Head>
        <title>Streamize - Sign in</title>
      </Head>
      <form onSubmit={handleSubmit} className="w-96">
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
        {error && <p className="mt-4 w-full text-sm text-red-500">{error}</p>}
        <Button color="red" type="submit" className="mt-4">
          Login
        </Button>
      </form>
    </div>
  );
}
