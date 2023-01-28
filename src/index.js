import NewApiService from "./js/api-service";

import createGalleryMarkup from "./js/gallery-makup"
import Notiflix from "notiflix";

const loadMoreBtn = document.querySelector('.load-more'); 
const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery');

const newApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.style.display = "none";

async function onSearch(e) {
    e.preventDefault();
    if (!loadMoreBtn.style.display == "none") { 
      loadMoreBtn.style.display == "none";
    }

    newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    newApiService.resetPage();

    try {
        if(newApiService.searchQuery.trim() === '') {
          clearList();
          Notiflix.Notify.failure('Please enter your search data.');
          loadMoreBtn.style.display == "none";
        } else {
        const response = await newApiService.makeRequest();
        const {
            data: { hits, totalHits }
                } = response;
                clearList();
                if (loadMoreBtn.style.display == "block") { 
                  loadMoreBtn.style.display == "none";
                }
                console.log(hits)

        if (hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          loadMoreBtn.style.display = "none";
        } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        createGalleryMarkup(hits);
        loadMoreBtn.style.display = "block";
        }  
      }
      } catch (err) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      console.log(err.message);

      loadMoreBtn.style.display = "none";
}
};

async function onLoadMore(e) {
    e.preventDefault();
    const response = await newApiService.makeRequest();
    const {
      data: { hits },
    } = response;
    
    if (hits.length === 0) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.style.display = "none";
    } else
      createGalleryMarkup(hits); 
      // loadMoreBtn.style.display = "none";
};

function clearList() {
    gallery.innerHTML = " ";
}
