import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer, ModalImage } from './App.styled';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33498062-ee2b42b41cbde2a2a11e8f88d';

export class App extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
    searchQuery: '',
    page: 1,
    hits: [],
    loading: false,
    hasMore: true,
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      });

      this.setState({ loading: true });
      axios
        .get(BASE_URL, { params })
        .then(response => {
          const newHits = response.data.hits;
          const totalHits = response.data.totalHits;
          this.setState(prevState => ({
            hits: [...prevState.hits, ...newHits],
            hasMore: newHits.length > 0,
            totalHits: totalHits,
          }));
          if (
            (prevState.hits.length === 0 && newHits.length === totalHits) ||
            (prevState.hits.length !== 0 && newHits.length < 12)
          ) {
            toast.info('No more images', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored',
            });
            this.setState({ hasMore: false });
          }
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
    this.setState({ searchQuery: searchValue, page: 1, hits: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL, showModal: true });
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { showModal, loading, hits, largeImageURL, hasMore } = this.state;
    const showLoadMoreBtn = !loading && hasMore && hits.length > 0;
    return (
      <AppContainer>
        <Searchbar onSearchSubmit={this.handleSearchFormSubmit} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage src={largeImageURL} />
          </Modal>
        )}
        {hits.length > 0 && (
          <ImageGallery
            images={hits}
            handleImageClick={this.handleImageClick}
          />
        )}
        {loading && <Loader />}
        {showLoadMoreBtn && (
          <Button onClick={this.handleLoadMore} disabled={loading} />
        )}
        <ToastContainer />
      </AppContainer>
    );
  }
}
