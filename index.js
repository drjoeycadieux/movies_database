document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchMovies(query);
    }
});

function fetchMovies(query) {
    const apiKey = 'abfad8858b825b16ebc9e74b10395f51';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'col-md-3 movie-item';
        movieItem.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top movie-poster" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="btn btn-primary">Watch</a>
                </div>
            </div>
        `;
        moviesList.appendChild(movieItem);
    });
}