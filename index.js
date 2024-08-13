const apiKey = 'abfad8858b825b16ebc9e74b10395f51';
let currentPage = 1;
let searchQuery = '';
let currentCategory = '';

const endpoints = {
    home: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=`,
    'top-rated': `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=`,
    search: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=`,
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home'); 
});

// Handle navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadContent(page);
    });
});

// Handle search input
document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    loadContent('search');
});


function loadContent(page) {
    currentCategory = page;
    currentPage = 1;
    document.getElementById('movie-list').innerHTML = '';
    fetchMovies();
}

function fetchMovies() {
    let url;
    if (currentCategory === 'search') {
        url = `${endpoints.search}${encodeURIComponent(searchQuery)}&page=${currentPage}`;
    } else {
        url = `${endpoints[currentCategory]}${currentPage}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            displayMovies(movies);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="play-button">Play Now</a>
        `;

        movieList.appendChild(movieElement);
    });
}

// Handle "Load More" button clicks
document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    fetchMovies();
});