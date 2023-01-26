import NewApiService from "./js/api-service";

import createGalleryMarkup from "./js/gallery-makup"
import Notiflix from "notiflix";

// const submitBtn = document.querySelector('button');
const loadMoreBtn = document.querySelector('.load-more'); 
const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery');

const newApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();

    if(!loadMoreBtn.hidden == true) {
        loadMoreBtn.hidden = false
    }

    newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    newApiService.resetPage();

    try {
        if(newApiService.searchQuery === '') {
          clearList();
          Notiflix.Notify.failure('Please enter your search data.');
        } else {
        loadMoreBtn.hidden = false;
        const response = await newApiService.makeRequest();
        const {
            data: { hits, totalHits },
                } = response;
                clearList();
                loadMoreBtn.hidden = true;
        
      
        if (hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
        loadMoreBtn.hidden = true;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        createGalleryMarkup(hits);
        }
        loadMoreBtn.hidden = false;
      }
      } catch (err) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      console.log(err.message);

      loadMoreBtn.hidden = true;
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
