import React, { Component } from 'react';
import fetchImages from '../services/apiService';
import Searchbar from '../Searchbar/Searchbar';
import Title from '../Title/Title';
import ImageGalleryList from '../ImageGallery/ImageGalleryList/ImageGalleryList';
import TextButton from '../Buttons/TextButton/TextButton';
import Modal from '../Modal/Modal';
import NotiflixLoading from '../Loader/NotiflixLoading';
import NotifyMessages from '../Messages/NotifyMessages';
import css from './App.module.css';

const notify = new NotifyMessages();
const loader = new NotiflixLoading();

const INITIAL_STATE = {
  images: [],
  searchQuery: '',
  currentPage: 1,
  pageSize: 12,
  total: 0,
  totalHits: 0,
  isLoading: false,
  showModal: false,
  // modalImg: '',
  // modalDescr: '',
  error: null,
};

class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      if (this.state.searchQuery === '') {
        return;
      }

      const { data } = await fetchImages();
      this.setState({ data });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  async getImages() {
    const { currentPage, searchQuery, pageSize } = this.state;
    const options = { searchQuery, currentPage, pageSize };
    this.setState({ isLoading: true });
    try {
      const { data } = await fetchImages(options);
      this.setState(prevState => ({
        images: [...data.hits],
        total: data.total,
        totalHits: data.totalHits,
        currentPage: prevState.currentPage + 1,
        error: null,
      }));

      this.handleMessages(data);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleFormSubmit = searchQuery => {
    this.reset();
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.getImages();
  };

  handleMessages = data => {
    if (data.totalHits !== 0 && this.state.currentPage === 1) {
      notify.onTotalImages(data.totalHits);
    }
    if (data.total === 0) {
      return notify.onFetchError();
    }
  };

  handleModal = (modalDescr, modalImg) => {
    this.setState({ modalDescr, modalImg });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const {
      images,
      currentPage,
      pageSize,
      totalHits,
      isLoading,
      showModal,
      modalImg,
      modalDescr,
      error,
    } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <Title text="Whoops, something went wrong" />}

        {images.length === 0 && (
          <Title text="Let's find whatever you want!.." />
        )}

        {isLoading ? loader.onLoading() : loader.onLoaded()}

        {images.length > 0 && !isLoading && (
          <ImageGalleryList images={images} onImageClick={this.handleModal} />
        )}

        {currentPage < totalHits / pageSize && !isLoading && (
          <TextButton text="Load more" onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal
            onClick={this.toggleModal}
            modalImg={modalImg}
            modalDescr={modalDescr}
          />
        )}
      </div>
    );
  }
}

export default App;
