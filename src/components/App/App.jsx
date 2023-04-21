import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { getImages } from 'services/api';
import { toastConfig } from 'services/utils';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer, ModalImage } from './App.styled';
export class App extends Component {
  state = {
    largeImageURL: '',
    searchQuery: '',
    page: 1,
    hits: [],
    loading: false,
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      getImages(searchQuery, page)
        .then(({ hits: newHits, totalHits }) => {
          if (this.state.searchQuery.trim() === '' || totalHits === 0) {
            toast.error('Enter a valid query', toastConfig);
            return;
          }
          if (
            (prevState.hits.length === 0 && newHits.length === totalHits) ||
            (prevState.hits.length !== 0 && newHits.length < 12)
          ) {
            toast.info('No more images', toastConfig);
          }

          this.setState(prevState => ({
            hits: [...prevState.hits, ...newHits],
            totalHits,
          }));
        })

        .catch(error => {
          console.error(error.response);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleSearchFormSubmit = searchValue => {
    this.setState({
      searchQuery: searchValue,
      page: 1,
      hits: [],
      totalHits: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (largeImageURL = '') => {
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { loading, hits, largeImageURL, totalHits } = this.state;
    const showLoadMoreBtn = !loading && hits.length !== totalHits;
    return (
      <AppContainer>
        <Searchbar onSearchSubmit={this.handleSearchFormSubmit} />
        {hits.length > 0 && (
          <ImageGallery images={hits} handleImageClick={this.toggleModal} />
        )}
        {showLoadMoreBtn && (
          <Button onClick={this.handleLoadMore} disabled={loading} />
        )}
        {loading && <Loader />}
        {largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <ModalImage src={largeImageURL} />
          </Modal>
        )}
        <ToastContainer />
      </AppContainer>
    );
  }
}
