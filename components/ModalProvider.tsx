import { Button, Modal } from '@mantine/core';
import { createContext, FC, useState } from 'react';

interface IModalContext {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPositiveLabel: React.Dispatch<React.SetStateAction<string>>;
  setNegativeLabel: React.Dispatch<React.SetStateAction<string>>;
  setPositiveAction: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
  setNegativeAction: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
}

export const ModalContext = createContext<IModalContext>({} as IModalContext);

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModelProvider: FC<ModalProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');

  const [positiveLabel, setPositiveLabel] = useState('');

  const [negativeLabel, setNegativeLabel] = useState('');

  //? will it impact the performance?
  const [positiveAction, setPositiveAction] = useState<() => void>();

  const [negativeAction, setNegativeAction] = useState<() => void>();

  function handlePositiveAction() {
    if (positiveAction) {
      positiveAction();
    }
    setOpen(false);
  }

  function handleNegativeAction() {
    if (negativeAction) {
      negativeAction();
    }
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen: open,
        openModal,
        closeModal,
        setTitle,
        setNegativeAction,
        setNegativeLabel,
        setPositiveAction,
        setPositiveLabel
      }}
    >
      <Modal
        withCloseButton={false}
        closeOnClickOutside={false}
        centered
        opened={open}
        onClose={() => setOpen(false)}
        title={title}
      >
        <div className="flex gap-4">
          {positiveLabel && (
            <Button variant="outline" onClick={handlePositiveAction}>
              {positiveLabel}
            </Button>
          )}
          {negativeLabel && (
            <Button variant="outline" onClick={handleNegativeAction}>
              {negativeLabel}
            </Button>
          )}
        </div>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
