import axios from "axios";

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
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
