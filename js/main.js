var $openIMDB = document.querySelector('#open-imdb');
var $closeIMDB = document.querySelector('#close-imdb');
var $modals = document.querySelectorAll('.modal');
var $titleForm = document.querySelector('#search-movie-title');
var $idForm = document.querySelector('#search-id');
var apikey = 'apikey=9de878f5';
var $views = document.querySelectorAll('.view');
var $closeEntryForm = document.querySelector('#close-entry-form');
var $starsContainer = document.querySelector('.stars-container');
var $stars = document.querySelectorAll('.fa-star');
var $ratingLabel = document.querySelector('#rating-label');
var $likedLabel = document.querySelector('#liked-label');
var $heart = document.querySelector('.fa-heart');
var $rewatchContainer = document.querySelector('#rewatch-container');
var $entryFilmPoster = document.querySelector('#entry-film-poster');
var $entryFilmTitle = document.querySelector('#entry-film-title');
var $entryFilmYear = document.querySelector('#entry-film-year');
var $movieEntryForm = document.querySelector('#movie-entry-form');
var $userActionBanner = document.querySelector('.user-action-banner');
var $navSearch = document.querySelector('#nav-search');

if (data.view === 'search-result') {
  renderSearchResult(data.lastSearch);
  changeView('search-result');
} else {
  changeView(data.view);
}

function toggleModals(targetModal) {
  for (var i = 0; i < $modals.length; i++) {
    if ($modals[i].getAttribute('data-modal') === targetModal) {
      if (data.modal.open === true) {
        $modals[i].className = 'modal hidden';
        data.modal.open = false;
      } else {
        $modals[i].className = 'modal';
        data.modal.current = targetModal;
        data.modal.open = true;
      }
    } else {
      $modals[i].className = 'modal hidden';
    }
  }
}

function toggleIMDBmodal(event) {
  toggleModals('imdb');
}

$openIMDB.addEventListener('click', toggleIMDBmodal);
$closeIMDB.addEventListener('click', toggleIMDBmodal);

function changeView(targetView) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetView) {
      $views[i].className = 'view';
      data.view = targetView;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

function closeEntryModal(event) {
  toggleModals('entry-form');
}

$closeEntryForm.addEventListener('click', closeEntryModal);

function createSearchResult(response) {
  resetEntryForm();
  var output = {};

  output.title = response.Title;
  output.year = response.Year;
  output.director = response.Director;
  output.writer = response.Writer;
  output.cast = response.Actors;
  output.plot = response.Plot;
  output.imdbID = response.imdbID;
  output.poster = response.Poster;
  output.runtime = response.Runtime;

  data.lastSearch = output;
  renderSearchResult(output);
  changeView('search-result');
  return output;
}

/* <div class="view" data-view="search-result" id="search-result-view">
  <div class="row container">
    <div class="column-half poster">
      <img src="https://m.media-amazon.com/images/M/MV5BOWI2YWQxM2MtY2U4Yi00YjgzLTgwNzktN2ExNTgzNTIzMmUzXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg" alt="movie poster">
    </div>
    <div class="column-half film-info-pd font-size-14">
      <div class="row">
        <h2 class="film-info-header">All the President's Men</h2>
      </div>
      <div class="row">
        <div class="mobile-width-half">
          <div class="row">
            <p>1976</p>
            <div class="divider-dot"></div>
            <p class="letter-spacing-1px">DIRECTED BY</p>
          </div>
          <div class="row">
            <p class="director">Alan J. Pakula</p>
          </div>
          <div class="row">
            <a href="#" class="imdb-link">IMDB</a>
            <p class="runtime">138 mins</p>
          </div>
        </div>
        <div class="mobile-width-half justify-flex-end align-center">
          <div class="add-entry-btn justify-center align-center" data-modal="entry-form">
            <a href="#" class="white-plus">+</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column-full">
          <p class="line-height-two">In the run-up to the 1972 elections, Washington Post reporter Bob Woodward
            covers what seems to be a minor break-in at the Democratic Party National
            headquarters. He is surprised to find top lawyers already on the defense case,
            and the discovery of names and addresses of Republican fund organizers on the
            accused further arouses his suspicions. The editor of the Post is prepared to
            run with the story and assigns Woodward and Carl Bernstein to it. They find the
            trail leading higher and higher in the Republican Party, and eventually into the
            White House itself.</p>
        </div>
      </div>
      <div class="row align-center">
        <p class="cast-writer-style-white">Cast</p>
        <p class="cast-writer-style-blue">Dustin Hoffman, Robert Redford, Jack Warden</p>
      </div>
      <div class="row align-center">
        <p class="cast-writer-style-white">Writers</p>
        <p class="cast-writer-style-blue">Carl Bernstein, Bob Woodward, William Goldman</p>
      </div>
    </div>
  </div>
</div> */

function renderSearchResult(movie) {
  var $searchResultView = document.querySelector('#search-result-view');

  var $movieOverview = document.createElement('div');
  $movieOverview.className = 'row container';
  $searchResultView.appendChild($movieOverview);

  var $posterContainer = document.createElement('div');
  $posterContainer.className = 'column-half poster';
  $movieOverview.appendChild($posterContainer);

  var $poster = document.createElement('img');
  $poster.setAttribute('src', movie.poster);
  $posterContainer.appendChild($poster);

  var $filmInfo = document.createElement('div');
  $filmInfo.className = 'column-half film-info-pd font-size-14';
  $movieOverview.appendChild($filmInfo);

  var $movieTitleContainer = document.createElement('div');
  $movieTitleContainer.className = 'row';
  $filmInfo.appendChild($movieTitleContainer);

  var $movieTitle = document.createElement('h2');
  $movieTitle.className = 'film-info-header';
  $movieTitle.textContent = movie.title;
  $movieTitleContainer.appendChild($movieTitle);

  var $directorAndButtonContainer = document.createElement('div');
  $directorAndButtonContainer.className = 'row';
  $filmInfo.appendChild($directorAndButtonContainer);

  var $directorHalf = document.createElement('div');
  $directorHalf.className = 'mobile-width-half';
  $directorAndButtonContainer.appendChild($directorHalf);

  var $yearContainer = document.createElement('div');
  $yearContainer.className = 'row';
  $directorHalf.appendChild($yearContainer);

  var $year = document.createElement('p');
  $year.textContent = movie.year;
  $yearContainer.appendChild($year);

  var $dividerDot = document.createElement('div');
  $dividerDot.className = 'divider-dot';
  $yearContainer.appendChild($dividerDot);

  var $directedBy = document.createElement('p');
  $directedBy.className = 'letter-spacing-1px';
  $directedBy.textContent = 'DIRECTED BY';
  $yearContainer.appendChild($directedBy);

  var $directorContainer = document.createElement('div');
  $directorContainer.className = 'row';
  $directorHalf.appendChild($directorContainer);

  var $director = document.createElement('p');
  $director.className = 'director';
  $director.textContent = movie.director;
  $directorContainer.appendChild($director);

  var $linkAndRuntime = document.createElement('div');
  $linkAndRuntime.className = 'row';
  $directorHalf.appendChild($linkAndRuntime);

  var $imdbLink = document.createElement('a');
  $imdbLink.className = 'imdb-link';
  $imdbLink.setAttribute('href', 'https://www.imdb.com/title/' + movie.imdbID);
  $imdbLink.textContent = 'IMDB';
  $linkAndRuntime.appendChild($imdbLink);

  var $runtime = document.createElement('p');
  $runtime.className = 'runtime';
  $runtime.textContent = movie.runtime;
  $linkAndRuntime.appendChild($runtime);

  var $buttonHalf = document.createElement('div');
  $buttonHalf.className = 'mobile-width-half justify-flex-end align-center';
  $directorAndButtonContainer.appendChild($buttonHalf);

  var $addEntryButton = document.createElement('div');
  $addEntryButton.className = 'add-entry-btn justify-center align-center';
  $addEntryButton.setAttribute('data-modal', 'entry-form');
  $addEntryButton.addEventListener('click', function () {
    addFilmToForm();
    toggleModals('entry-form');
  });
  $buttonHalf.appendChild($addEntryButton);

  var $plusSign = document.createElement('a');
  $plusSign.className = 'white-plus';
  $plusSign.setAttribute('href', '#');
  $plusSign.textContent = '+';
  $addEntryButton.appendChild($plusSign);

  var $summaryContainer = document.createElement('div');
  $summaryContainer.className = 'row';
  $filmInfo.appendChild($summaryContainer);

  var $movieSummary = document.createElement('div');
  $movieSummary.className = 'column-full';
  $summaryContainer.appendChild($movieSummary);

  var $summaryContent = document.createElement('p');
  $summaryContent.className = 'line-height-two';
  $summaryContent.textContent = movie.plot;
  $movieSummary.appendChild($summaryContent);

  var $castContainer = document.createElement('div');
  $castContainer.className = 'row align-center';
  $filmInfo.appendChild($castContainer);

  var $cast = document.createElement('p');
  $cast.className = 'cast-writer-style-white';
  $cast.textContent = 'Cast';
  $castContainer.appendChild($cast);

  var $actorsList = document.createElement('p');
  $actorsList.className = 'cast-writer-style-blue';
  $actorsList.textContent = movie.cast;
  $castContainer.appendChild($actorsList);

  var $writersContainer = document.createElement('div');
  $writersContainer.className = 'row align-center mb-70';
  $filmInfo.appendChild($writersContainer);

  var $writers = document.createElement('p');
  $writers.className = 'cast-writer-style-white';
  $writers.textContent = 'Writers';
  $writersContainer.appendChild($writers);

  var $writersList = document.createElement('p');
  $writersList.className = 'cast-writer-style-blue';
  $writersList.textContent = movie.writer;
  $writersContainer.appendChild($writersList);
}

function searchTitle(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var searchTitle = $titleForm.title.value;
  var searchYear = $titleForm.year.value;

  if (searchYear !== '') {
    xhr.open('GET', 'http://www.omdbapi.com/?t=' + searchTitle + '&' + 'y=' + searchYear + '&' + 'plot=full' + '&' + apikey);
  } else {
    xhr.open('GET', 'http://www.omdbapi.com/?t=' + searchTitle + '&' + 'plot=full' + '&' + apikey);
  }
  xhr.responseType = 'json';

  function returnTitleSearch(event) {
    createSearchResult(xhr.response);
    $titleForm.reset();
  }

  xhr.addEventListener('load', returnTitleSearch);
  xhr.send();
}

$titleForm.addEventListener('submit', searchTitle);

function searchID(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var searchID = $idForm.imdbID.value;

  xhr.open('GET', 'http://www.omdbapi.com/?i=' + searchID + '&' + apikey);
  xhr.responseType = 'json';

  function returnIdSearch(event) {
    createSearchResult(xhr.response);
    $idForm.reset();
  }

  xhr.addEventListener('load', returnIdSearch);
  xhr.send();
}

$idForm.addEventListener('submit', searchID);

function addFilmToForm() {
  $entryFilmPoster.setAttribute('src', data.lastSearch.poster);
  $entryFilmTitle.textContent = data.lastSearch.title;
  $entryFilmYear.textContent = data.lastSearch.year;
  data.currentEntry.movie = data.lastSearch;
}

data.currentEntry.rating = 0;
function rateMovie(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  var clickedStar = event.target;
  var starIndex = parseInt(clickedStar.getAttribute('data-index'));
  if (starIndex === 1 && data.currentEntry.rating === 1) {
    for (var i = 0; i < $stars.length; i++) {
      $stars[i].className = 'fas fa-star';
    }
    data.currentEntry.rating = 0;
  } else {
    for (i = 0; i < $stars.length; i++) {
      if (i < starIndex) {
        $stars[i].className = 'fas fa-star rated';
      } else {
        $stars[i].className = 'fas fa-star';
      }
    }
    data.currentEntry.rating = starIndex;
  }
  if (data.currentEntry.rating !== 0) {
    $ratingLabel.textContent = 'Rated';
  } else {
    $ratingLabel.textContent = 'Rate';
  }
}

$starsContainer.addEventListener('click', rateMovie);

function likeMovie(event) {
  var clickedHeart = event.target;
  if (clickedHeart.className === 'fas fa-heart liked') {
    clickedHeart.className = 'fas fa-heart';
    data.currentEntry.liked = false;
  } else {
    clickedHeart.className = 'fas fa-heart liked';
    data.currentEntry.liked = true;
  }
  if (data.currentEntry.liked === true) {
    $likedLabel.textContent = 'Liked';
  } else {
    $likedLabel.textContent = 'Like';
  }
}

$heart.addEventListener('click', likeMovie);

function rewatchedMovie(event) {
  if (data.currentEntry.rewatched === false) {
    $rewatchContainer.className = 'row padding-tb-75-rem flex-column align-center pt-1-5rem light-blue-text';
    data.currentEntry.rewatched = true;
  } else {
    $rewatchContainer.className = 'row padding-tb-75-rem flex-column align-center pt-1-5rem grey-text';
    data.currentEntry.rewatched = false;
  }
}

$rewatchContainer.addEventListener('click', rewatchedMovie);

function resetEntryForm() {
  $movieEntryForm.reset();
  data.currentEntry.rating = 0;
  data.currentEntry.liked = false;
  data.currentEntry.rewatched = false;
  data.currentEntry.review = '';
  data.currentEntry.date = '';
  data.currentEntry.movie = {};
}

function saveEntry(event) {
  event.preventDefault();
  data.currentEntry.date = $movieEntryForm.elements.date.value;
  data.currentEntry.review = $movieEntryForm.elements.review.value;
  data.entries.push(data.currentEntry);
  toggleModals('entry-form');
  showBanner();
  setTimeout(hideBanner, 3000);
}

$movieEntryForm.addEventListener('submit', saveEntry);

function showBanner() {
  var $bannerMovie = document.querySelector('#banner-movie');
  $bannerMovie.textContent = data.currentEntry.movie.title;
  $userActionBanner.className = 'user-action-banner white-text text-center font-size-12 justify-center align-flex-end drop-down';
}

function hideBanner() {
  $userActionBanner.className = 'user-action-banner white-text text-center font-size-12 justify-center align-flex-end';
}

function navToSearchFilms(event) {
  changeView('search-films');
}

$navSearch.addEventListener('click', navToSearchFilms);
