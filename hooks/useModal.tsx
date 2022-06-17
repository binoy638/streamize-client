import { useCallback, useContext } from 'react';

import { ModalContext } from '../components/ModalProvider';

interface ModalProps {
  title: string;
  positiveLabel?: string;
  negativeLabel?: string;
  onPositiveAction?: () => void;
  onNegativeAction?: () => void;
}

const useModal = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    setTitle,
    setNegativeAction,
    setNegativeLabel,
    setPositiveAction,
    setPositiveLabel
  } = useContext(ModalContext);

  const showModal = useCallback(
    ({
      title,
      positiveLabel,
      negativeLabel,
      onNegativeAction,
      onPositiveAction
    }: ModalProps) => {
      positiveLabel && setPositiveLabel(positiveLabel);
      negativeLabel && setNegativeLabel(negativeLabel);
      onPositiveAction && setPositiveAction(() => onPositiveAction);
      onNegativeAction && setNegativeAction(() => onNegativeAction);
      setTitle(title);
      openModal();
    },
    []
  );

  return { isOpen, showModal, closeModal };
};

export default useModal;
