// const apiKey = `db495702f47a04e9f1e573d74fef85c1`;
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=db495702f47a04e9f1e573d74fef85c1`;
const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=db495702f47a04e9f1e573d74fef85c1&query=`;
const imgPath = 'https://image.tmdb.org/t/p/w500/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(APIURL);
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results);
    console.log(respData);
}

function showMovies(movies) {
    // clear main:
    main.innerHTML = '';
    movies.forEach(movie => {
        if (movie.poster_path !== null) {
            let movieEl = document.createElement('div');
            let {title, poster_path, vote_average, overview} = movie;
            movieEl.classList.add('movie');
            let movieElLeyout = `<div class="movie-poster">
                <img src=${imgPath + poster_path} alt=${title}>
            </div>
            <div class="movie-info">
                <h3 class="title">${title}</h3>
                <span class=${getClassByRate(vote_average)}>${vote_average}</span>
            </div>
            <div class='overview'>
                <h3>Overview:</h3>
                <p>${overview}</p>
            </div>`;
            movieEl.innerHTML = movieElLeyout;
            main.appendChild(movieEl);
        }
    });
}

function getClassByRate(vote) {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const term = search.value;
    if (term) {
        getMovies(searchApi + term);
        search.value = '';
    }
});