import SimpleLightbox from "Simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
// let galleryOpenModal = new SimpleLightbox('.gallery a');

export default async function createGalleryMarkup(hits) {
    const markup = hits.map(
            (({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                return `
                <div class="photo-card gallery__item">
                <a class="gallery__link" href="${largeImageURL}" style ="display:inline-block; text-decoration:none; color:black;">
           <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  ${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                  ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${downloads}
                </p>
              </div></a>
              </div> `;
              }));
    
    gallery.insertAdjacentHTML('beforeend', markup);                                                   //Вставляет результат вызова шаблона
    // const lightbox = new SimpleLightbox('.gallery a', {
    //   captionsData: 'alt',
    //   captionDelay: 250,
    // });
    // SimpleLightbox.refresh();
    SimpleLightbox();
    // scroll();  
};

function SimpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
