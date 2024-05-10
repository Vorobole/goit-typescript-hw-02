import { FC } from 'react';
import css from './ImageModal.module.css';
import Modal from 'react-modal';
import { ImageSrc } from '../App';

interface ImageModalProps {
  isOpen: boolean;
  photo: { src: string };

  onChange: (arg0: boolean, arg1: ImageSrc) => void;
}

const ImageModal: FC<ImageModalProps> = ({
  isOpen = false,
  photo,
  onChange,
}) => {
  Modal.setAppElement(document.getElementById('root') as HTMLElement);
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={() => onChange}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
    >
      <img className={css.modalImg} src={photo.src} />
    </Modal>
  );
};

export default ImageModal;
