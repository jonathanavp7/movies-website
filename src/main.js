// Data

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        // 'language': navigator.language || "es-ES"
    }
});

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {}
    }

    return movies; 
}

function likeMovie(movie) {
    const likedMovies = likedMoviesList();

    console.log(likedMovies);

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}

// lazy loading
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    const popular = document.querySelector('.popular .popular-content .swiper-wrapper');
    popular.innerHTML = '';

    movies.forEach(movie => {
        const popular = document.querySelector('.popular .popular-content .swiper-wrapper');
        // swiper slide
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        // movie container
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        // movie img
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        // box text 
        const boxText = document.createElement('div');
        let voteAverage = movie.vote_average;
        let voteAverageFixed = voteAverage.toFixed(1);
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${voteAverageFixed} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likedMoviesList()[movie.id] && likeBtn.classList.add('like-btn--liked');
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('like-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        });

        lazyLoader.observe(movieImg);

        movieBox.appendChild(boxText);
        movieBox.appendChild(movieImg);
        swiperSlide.appendChild(likeBtn);
        swiperSlide.appendChild(movieBox);
        popular.appendChild(swiperSlide);
    });
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    const moviesContent = document.querySelector('.movies .movies-content');

    movies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://i1.wp.com/image.24ur.com/media/images/gallery/Jan2008/60091132.jpg');
        });
        // box text 
        const boxText = document.createElement('div');
        let voteAverage = movie.vote_average;
        let voteAverageFixed = voteAverage.toFixed(1);
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${voteAverageFixed} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        movieBox.append(movieImg, boxText);
        moviesContent.appendChild(movieBox);
    });
}

let page = 1;

async function getPaginatedTrendingMovies() {
    page++
    const { data } = await api('trending/movie/day', {
        params: {
            page,
        },
    });
    const movies = data.results;

    const moviesContent = document.querySelector('.movies .movies-content');

    movies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://i1.wp.com/image.24ur.com/media/images/gallery/Jan2008/60091132.jpg');
        });
        // box text 
        const boxText = document.createElement('div');
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${movie.vote_average} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        movieBox.append(movieImg, boxText);
        moviesContent.appendChild(movieBox);
    });
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    const categoriesContent = document.querySelector('.genres .genres-links');
    categoriesContent.innerHTML = '';

    categories.forEach(category => {
        const categories = document.querySelector('.genres .genres-links');
        const buttonCategory = document.createElement('a');
        buttonCategory.innerText = category.name;
        buttonCategory.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        categories.appendChild(buttonCategory);
    });
}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    const genresContent = document.querySelector('.genres-content');
    genresContent.innerHTML = "";

    movies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://i1.wp.com/image.24ur.com/media/images/gallery/Jan2008/60091132.jpg');
        });
        // box text 
        const boxText = document.createElement('div');
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${movie.vote_average} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        movieBox.append(movieImg, boxText);
        genresContent.appendChild(movieBox);
    });
}

async function getMoviesBySearch(query) {
    query = decodeURI(query); 
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;

    const homeSection = document.querySelector('.home');
    const popularSection = document.querySelector('.popular');
    const genresSection = document.querySelector('.genres');
    const moviesSection = document.getElementById('movies');
    const nextPage = document.querySelector('.next-page');
    const favouritesSection = document.getElementById('favourites');
    homeSection.innerHTML = "";
    popularSection.innerHTML = "";
    genresSection.innerHTML = "";
    moviesSection.innerHTML = "";
    nextPage.innerHTML = "";
    favouritesSection.innerHTML = "";
    homeSection.classList.remove('home');
    homeSection.classList.add('movies');
    homeSection.classList.add('container');
    const moviesContent = document.createElement('div');
    moviesContent.classList.add('movies-content');
    moviesContent.style.marginTop = '40px';

    movies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://i1.wp.com/image.24ur.com/media/images/gallery/Jan2008/60091132.jpg');
        });
        let voteAverage = movie.vote_average;
        let voteAverageFixed = voteAverage.toFixed(1);
        // box text 
        const boxText = document.createElement('div');
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${voteAverageFixed} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        movieBox.append(movieImg, boxText);
        moviesContent.appendChild(movieBox);
        homeSection.appendChild(moviesContent);
    });
}

async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    const tituloMovieDetail = document.querySelector('.play-container .play-text h2');
    tituloMovieDetail.innerText = movie.title;
    const movieImgDetail = document.querySelector('.play-container .play-img');
    movieImgDetail.setAttribute('src', 'https://image.tmdb.org/t/p/original' + movie.backdrop_path);
    const voteAverageDetail = document.querySelector('.play-container .play-text .rating h2');
    let voteAverage = movie.vote_average;
    let voteAverageFixed = voteAverage.toFixed(1);
    voteAverageDetail.innerText = voteAverageFixed;
    const aboutMovieDetailTitle = document.querySelector('.about-movie h2');
    aboutMovieDetailTitle.innerText = movie.title;
    const aboutMovieDetailP = document.querySelector('.about-movie p');
    aboutMovieDetailP.innerText = movie.overview;
    const span1MovieDetail = document.querySelector('.play-container .play-text .tags .span-1');
    const span2MovieDetail = document.querySelector('.play-container .play-text .tags .span-2');
    const span3MovieDetail = document.querySelector('.play-container .play-text .tags .span-3');
    span1MovieDetail.innerText = movie.genres[0].name;
    span2MovieDetail.innerText = movie.genres[1].name;
    span3MovieDetail.innerText = movie.genres[2].name;

    document.title = movie.title;

    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
    const relatedMoviesContainer = document.querySelector('.related-movies .movies-content');


    relatedMovies.forEach(movie => {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://i1.wp.com/image.24ur.com/media/images/gallery/Jan2008/60091132.jpg');
        });
        let voteAverage = movie.vote_average;
        let voteAverageFixed = voteAverage.toFixed(1);
        // box text 
        const boxText = document.createElement('div');
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${voteAverageFixed} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        movieBox.append(movieImg, boxText);
        relatedMoviesContainer.appendChild(movieBox);
    });
}

function getLikedMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    const favouritesMoviesContent = document.querySelector('.favourites .favourites-content .swiper-wrapper');

    favouritesMoviesContent.innerHTML = '';

    moviesArray.forEach(movie => {
        // swiper slide
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        // movie container
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');
        movieBox.addEventListener('click', () => {
            // window.location.href = './movie.html';
            location.hash = '#movie=' + movie.id;
        });
        // movie img
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-box-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        // box text 
        const boxText = document.createElement('div');
        let voteAverage = movie.vote_average;
        let voteAverageFixed = voteAverage.toFixed(1);
        boxText.classList.add('box-text');
        boxText.innerHTML = `
            <h2 class="movie-title">${movie.title}</h2>
            <span class="movie-type">${voteAverageFixed} <i class='bx bxs-star star-trend' ></i></span>
            <a href="#" class="watch-btn play-btn">
                <i class='bx bx-play-circle' ></i>
            </a>
        `;

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likedMoviesList()[movie.id] && likeBtn.classList.add('like-btn--liked');
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('like-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        });

        lazyLoader.observe(movieImg);

        movieBox.appendChild(boxText);
        movieBox.appendChild(movieImg);
        swiperSlide.appendChild(likeBtn);
        swiperSlide.appendChild(movieBox);
        favouritesMoviesContent.appendChild(swiperSlide);
    });
}

getTrendingMoviesPreview();
getTrendingMovies();
getCategoriesPreview();
getLikedMovies();

// Swiper Js
var swiper = new Swiper(".popular-content", {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        280: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        510: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        758: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        900: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    }
});

// Show Video
let playButton = document.querySelector('.play-movie');
let video = document.querySelector('.video-container');
let myvideo = document.querySelector('#myvideo');
let closebtn = document.querySelector('.close-video');

playButton.onclick = () => {
    video.classList.add('show-video');
    // Auto Play when click on button
    myvideo.play();
};
closebtn.onclick = () => {
    video.classList.remove('show-video');
    // Pause when click on close video
    myvideo.pause();
};

