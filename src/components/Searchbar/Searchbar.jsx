import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import IconButton from '../Buttons/IconButton/IconButton';
import NotifyMessages from '../Messages/NotifyMessages';
import css from './Searchbar.module.css';

const notify = new NotifyMessages();

class Searchbar extends Component {
  state = { searchQuery: '' };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      notify.onNullSearchQuery();
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <IconButton type="submit" aria-label="Search images">
            <SearchIcon width="20" heigth="20" />
          </IconButton>
          <input
            className={css.input}
            onChange={this.handleChange}
            value={searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
