import { Button, PasswordInput, TextInput } from '@mantine/core';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

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
    onError: (error: AxiosError) => {
      if (error) {
        error.response?.status === 401
          ? setError('Invalid username or password')
          : setError('Something went wrong');
      } else {
        setError('Something went wrong');
      }
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ username, password });
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-96">
        <TextInput
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          label="Username"
          required
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          label="Password"
          required
        />
        {error && <p className="text-red-500 text-sm w-full mt-4">{error}</p>}
        <Button color="red" type="submit" className="mt-4">
          Login
        </Button>
      </form>
    </div>
  );
}
