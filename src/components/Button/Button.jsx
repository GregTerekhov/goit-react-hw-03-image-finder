import React from 'react';
import { LoadMoreBtn, ContainerButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ContainerButton>
      <LoadMoreBtn type="button" onClick={onClick}>
        Load more
      </LoadMoreBtn>
    </ContainerButton>
  );
};
