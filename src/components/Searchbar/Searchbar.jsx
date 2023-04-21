import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSearchSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handleQueryChange = event => {
    this.setState({
      searchValue: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      toast.error('Enter a valid query', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return;
    }
    this.props.onSearchSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header onSubmit={this.handleSubmit}>
        <SearchForm>
          <SearchButton type="submit">
            <FiSearch style={{ width: 20, height: 20 }} />
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
