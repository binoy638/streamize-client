import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Textarea } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useAddMagnet from '@/hooks/useAddMagnet';

const formSchema = z.object({
  magnet: z.string().regex(/^magnet:\?xt=urn:btih:[\dA-Fa-f]{40,}.*$/, {
    message: 'invalid magnet link',
  }),
});

export type FormValue = z.infer<typeof formSchema>;

function AddMagnetForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      magnet: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useAddMagnet({
    successMessage: 'Successfully added to queue',
    onSuccessAction: () => {
      closeAllModals();
    },
  });

  const onSubmit = (data: FormValue) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register('magnet')}
        placeholder="Magnet link"
        error={errors.magnet?.message as unknown as string}
        data-autofocus
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}

export default AddMagnetForm;
