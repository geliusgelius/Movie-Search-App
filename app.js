const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');

const API_KEY = '8e995492'; 

const fetchMovies = async (query) => {
    try {
        const encodedQuery = encodeURIComponent(query); 
        const response = await fetch(`https://www.omdbapi.com/?s=${encodedQuery}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === 'True') {
            displayResults(data.Search);
        } else {
            results.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        results.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
};

const displayResults = (movies) => {
    results.innerHTML = movies.map(movie => `
        <div class="movie">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
        </div>
    `).join('');
};

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    }
});
