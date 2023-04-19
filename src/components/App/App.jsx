import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
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
  };

  // componentDidMount() {
  //   if (this.state.searchQuery !== '') {
  //     this.fetchImages();
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
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
        this.setState(prevState => ({
          hits: [...prevState.hits, ...newHits],
          loading: false,
          hasMore: newHits.length > 0,
        }));

        // eslint-disable-next-line no-undef
        if (newHits.length === 0 && prevState.hits.length !== 0) {
          alert('No more images');
        }
      })

      .catch(error => {
        console.error(error.response);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleSearchFormSubmit = searchValue => {
    this.setState({ searchQuery: searchValue, page: 1, hits: [] });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1, loading: true }),
      this.fetchImages()
    );
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL, showModal: true });
  };

  toggleModal = () => {
    const { showModal } = this.state;

    // if (!showModal) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflow = 'auto';
    // }
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
        {loading && <h1>Loading...</h1>}
        {showLoadMoreBtn && (
          <Button onClick={this.handleLoadMore} disabled={loading} />
        )}
        <ToastContainer autoClose={3000} />
      </AppContainer>
    );
  }
}
