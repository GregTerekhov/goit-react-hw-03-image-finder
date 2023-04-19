import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage src={webformatURL} alt={tags} onClick={onClick} />
    </GalleryItem>
  );
};
