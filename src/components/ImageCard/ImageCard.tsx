import css from './ImageCard.module.css';
import { MouseEvent } from 'react';
import { ImageSrc } from '../App';
import { FC } from 'react';

interface ImageCardProps {
  card: {
    alt_description: string;
    urls: {
      small: string;
      regular: string;
    };
  };
  onSelect: (arg0: boolean, arg1: ImageSrc) => void;
}

const ImageCard: FC<ImageCardProps> = ({ card, onSelect }) => {
  return (
    <div className={css.container}>
      <img
        className={css.img}
        src={card.urls.small}
        alt={card.alt_description}
        onClick={(e: MouseEvent<HTMLImageElement>) =>
          onSelect(true, {
            src: card.urls.regular,
            description: card.alt_description,
          })
        }
      />
    </div>
  );
};

export default ImageCard;
