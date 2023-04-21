import { ThreeCircles } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeCircles />;
    </LoaderContainer>
  );
};
