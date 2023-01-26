import NewApiService from "./js/api-service";

import createGalleryMarkup from "./js/gallery-makup"
import Notiflix from "notiflix";

const loadMoreBtn = document.querySelector('.load-more'); 
const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery');

const newApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.classList.add('is-hidden');

async function onSearch(e) {
    e.preventDefault();
    if(!loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.add('is-hidden');
    }

    newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    newApiService.resetPage();

    try {
        if(newApiService.searchQuery === '') {
          clearList();
          Notiflix.Notify.failure('Please enter your search data.');
        } else {
        // loadMoreBtn.classList.remove('is-hidden');
        const response = await newApiService.makeRequest();
        const {
            data: { hits, totalHits }
                } = response;
                clearList();
                loadMoreBtn.classList.add('is-hidden');
      
        if (hits.length === 0) {
          loadMoreBtn.classList.add('is-hidden');
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        createGalleryMarkup(hits);
        }
        loadMoreBtn.classList.remove('is-hidden');
      }
      } catch (err) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      console.log(err.message);

      loadMoreBtn.classList.add('is-hidden');
}
};

async function onLoadMore() {
    const response = await newApiService.makeRequest();
    const {
      data: { hits },
    } = response;
    
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else createGalleryMarkup(hits); 
};

function clearList() {
    gallery.innerHTML = " ";
}
