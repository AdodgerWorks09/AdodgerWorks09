const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"; // Replace with your API key
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="; // Replace with your API key

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const suggestionsContainer = document.getElementById("suggestions");

// Initially get favorite movies
getMovies(APIURL);

async function getMovies(url) {
    console.log(`Fetching movies from: ${url}`); // Log the URL being fetched
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            const errorData = await resp.json();
            throw new Error(errorData.status_message || 'Network response was not ok');
        }
        const respData = await resp.json();
        console.log('Movies fetched successfully:', respData); // Log the fetched data
        showMovies(respData.results);
    } catch (error) {
        console.error('Fetch error:', error);
        main.innerHTML = `<p>Error fetching movies: ${error.message}. Please try again later.</p>`;
    }
}

function showMovies(movies) {
    // Clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
