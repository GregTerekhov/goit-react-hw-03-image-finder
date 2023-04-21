import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
