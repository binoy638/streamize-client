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
    setPositiveLabel,
  } = useContext(ModalContext);

  const showModal = useCallback(
    ({
      title,
      positiveLabel,
      negativeLabel,
      onNegativeAction,
      onPositiveAction,
    }: ModalProps) => {
      if (positiveLabel) {
        setPositiveLabel(positiveLabel);
      }
      if (negativeLabel) {
        setNegativeLabel(negativeLabel);
      }
      if (onPositiveAction) {
        setPositiveAction(() => onPositiveAction);
      }
      if (onNegativeAction) {
        setNegativeAction(() => onNegativeAction);
      }
      setTitle(title);
      openModal();
    },
    [
      openModal,
      setPositiveLabel,
      setPositiveAction,
      setNegativeLabel,
      setNegativeAction,
      setTitle,
    ]
  );

  return { isOpen, showModal, closeModal };
};

export default useModal;
