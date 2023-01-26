import axios from "axios";
// import Notiflix from "notiflix";

// const input = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.hidden = true;

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = `33000427-89fe7bf8f999bb2d1ca661cd2`;

export default class NewApiService {
    constructor() {
        this.searchQuery = '';
        this.perPage = 40;
        this.page = 1;
    };

    async makeRequest() {
        const params = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.pageAmount,
            per_page: this.perPage,
        });

        const url = `${BASE_URL}/?${params}`;
        // console.log(url);
        this.incrementPage();
        return await axios.get(url);


        // if (this.searchQuery.length === 0) {
        //     return;
        // }

        // try {
        //     const response = await axios.get(url);
        //     const totalHits =  await response.data.totalHits;
        //     console.log(totalHits);
        //     this.incrementPage();
        //     if (this.per_page > totalHits) {
        //         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        //         loadMoreBtn.hidden = true;
        //     // } else if (per_page < totalHits) {
        //     //     loadMoreBtn.hidden = false;
        //     }
        //     console.log(response)
        //     return response;

        // } catch (err) {
        //     console.log(err);
        // }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    // get query() {
    //     return this.searchQuery;
    // }

    // set query(newQuery) {
    //     this.searchQueary = newQuery;
    // }
}
