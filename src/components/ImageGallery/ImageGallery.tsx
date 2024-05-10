import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { ImageSrc } from '../App';
import { FC } from 'react';

export type ImageId = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
};
interface ImageGalleryProps {
  photos: ImageId[];
  onSelect: (arg0: boolean, arg1: ImageSrc) => void;
}
const ImageGallery: FC<ImageGalleryProps> = ({ photos, onSelect }) => {
  return (
    <ul className={css.list}>
      {photos.map(photo => (
        <li className={css.item} key={photo.id}>
          <ImageCard card={photo} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
