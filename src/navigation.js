const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('#search-input');
searchBtn.addEventListener('click', () => {
    if (location.hash == '') {
        location.hash = '#search=' + searchInput.value;
    } else {
        location.hash = '#search=' + searchInput.value;
        location.reload();
    }
});
searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (location.hash == '') {
            location.hash = '#search=' + searchInput.value;
        } else {
            location.hash = '#search=' + searchInput.value;
            location.reload();
        }
    }
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#popular')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
}

function homePage() {
    console.log('Homee!!');
}

function categoriesPage() {
    console.log('Categorieeees!!');

    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    const titleGenre = document.querySelector('.title-genres-container .title-genres');
    titleGenre.innerText = categoryName;

    getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    console.log('Movieeeeeeee!!');

    const body = document.querySelector('body');
    body.innerHTML = "";
    body.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jumanji: Welcome to the Jungle</title>
        <!-- Link to CSS -->
        <link rel="stylesheet" href="./css/main.css">
        <!-- Fav Icon -->
        <link rel="stylesheet" href="./src/assets/img/fav-icon.png">
        <!-- Box Icons -->
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <!-- Link Swiper CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    </head>
    <body>
        <!-- Header -->
        <header>
            <!-- Nav -->
            <div class="nav container">
                <!-- logo -->
                <a href="index.html" class="logo">
                    Yun<span>Films</span>
                </a>
                <!-- Search Box -->
                <div class="search-box">
                    <input type="search" name="" id="search-input-2" placeholder="Search Movie...">
                    <i class='bx bx-search-alt-2 search-btn-2'></i>
                </div>
                <!-- User -->
                <a href="#" class="user">
                    <i class='bx bxs-user-circle'></i>
                </a>
                <!-- NavBar -->
                <div class="navbar">
                    <a href="./index.html" class="nav-link">
                        <i class='bx bx-home-alt-2' ></i>
                        <span class="nav-link-title">Home</span>
                    </a>
                    <a href="#popular" class="nav-link">
                        <i class='bx bxs-hot' ></i>
                        <span class="nav-link-title">Trending</span>
                    </a>
                    <a href="#genres" class="nav-link">
                        <i class='bx bxs-film'></i>
                        <span class="nav-link-title">Genres</span>
                    </a>
                    <a href="#movies" class="nav-link">
                        <i class='bx bx-tv'></i>
                        <span class="nav-link-title">Movies</span>
                    </a>
                    <a href="#favourites" class="nav-link">
                        <i class='bx bx-heart' ></i>
                        <span class="nav-link-title">Favourites</span>
                    </a>
                </div>
            </div>
        </header>
        <!-- Play Movie Container -->
        <div class="play-container container">
            <!-- Play Image -->
            <img src="./src/assets/img/play-page-img/play-background.jpg" alt="" class="play-img">
            <!-- Play Text -->
            <div class="play-text">
                <h2>Jumanji: Welcome to the Jungle</h2>
                <!-- Ratings -->
                <div class="rating">
                    <h2></h2>
                    <i class='bx bxs-star' ></i>
                </div>
                <!-- Tags -->
                <div class="tags">
                    <span class="span-1">Action</span>
                    <span class="span-2">Adventure</span>
                    <span class="span-3">4K</span>
                </div>
                <!-- Trailer Button -->
                <a href="#" class="watch-btn">
                    <i class="bx bx-play-circle"></i>
                    <span>Watch the trailer</span>
                </a>
            </div>
            <!-- Play Btn -->
            <i class="bx bx-play play-movie"></i>
            <!-- Video Container -->
            <div class="video-container">
                <!-- Video Box -->
                <div class="video-box">
                    <video id="myvideo" src="./src/assets/img/play-page-img/Jumanji.mp4" controls></video>
                    <!-- Close Video Icon -->
                    <i class="bx bx-x close-video"></i>
                </div>
            </div>
        </div>
        <!-- About -->
        <div class="about-movie container">
            <h2>Jumanji: Welcome to the Jungle</h2>
            <p>When four students play with a magical video game, they are drawn to the jungle world of Jumanji, where they are trapped as their avatars. To return to the real world, they must finish the game.</p>        
        </div>
        <!-- Download -->
        <div class="download">
            <h2 class="download-title">Download Movie</h2>
            <div class="download-links">
                <a href="./src/assets/img/play-page-img/Jumanji.mp4" download>480p</a>
                <a href="./src/assets/img/play-page-img/Jumanji.mp4" download>720p</a>
                <a href="./src/assets/img/play-page-img/Jumanji.mp4" download>1080p</a>
            </div>
        </div>
        <!-- Related Movies -->
        <section class="related-movies movies container" id="movies">
            <!-- Heading -->
            <div class="heading">
                <h2 class="heading-title">Related Movies</h2>
            </div>
            <!-- Movies Content -->
            <div class="movies-content">
                <!-- Aqui van las pelis relacionadas -->
            </div>
        </section>
        <!-- Copyright -->
        <div class="copyright">
            <p>&#169; YunFilms All Rights Reserved</p>
        </div>
        
        <!-- Link Swiper Js -->
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <!-- Links to Js -->
        <script src="./src/secrets.js"></script>
        <script src="./src/main.js"></script>
    </body>
    </html>
    `;

    window.scrollTo(0,0);

    const searchBtn = document.querySelector('.search-btn-2');
    const searchInput = document.querySelector('#search-input-2');
    searchBtn.addEventListener('click', () => {
        if (location.hash == '') {
            location.hash = '#search=' + searchInput.value;
        } else {
            location.hash = '#search=' + searchInput.value;
            location.reload();
        }
    });
    searchInput.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (location.hash == '') {
                location.hash = '#search=' + searchInput.value;
            } else {
                location.hash = '#search=' + searchInput.value;
                location.reload();
            }
        }
    });

    // ['#movie', '12345']
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage() {
    console.log('Seaaaaaaarch');

    // ['search', 'platzi']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('Treeeeeeends!!');
}