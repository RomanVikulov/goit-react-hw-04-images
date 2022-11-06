import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NotifyMessages {
  onFetchError() {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  onNullSearchQuery() {
    return Notify.info(
      "We're sorry, but you should enter some name in the search box."
    );
  }

  onTotalImages(total) {
    return Notify.success(`Hooray! We found ${total} images.`);
  }
}
