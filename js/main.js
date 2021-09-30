var $openIMDB = document.querySelector('#open-imdb');
var $closeIMDB = document.querySelector('#close-imdb');
var $modals = document.querySelectorAll('.modal');
var $titleForm = document.querySelector('#search-movie-title');
var $idForm = document.querySelector('#search-id');
var apikey = 'apikey=9de878f5';
var $views = document.querySelectorAll('.view');
var $closeEntryForm = document.querySelector('#close-entry-form');
var $starsContainer = document.querySelector('.stars-container');
var $stars = document.querySelectorAll('.form-star');
var $ratingLabel = document.querySelector('#rating-label');
var $likedLabel = document.querySelector('#liked-label');
var $heart = document.querySelector('.fa-heart');
var $rewatchContainer = document.querySelector('#rewatch-container');
var $entryFilmPoster = document.querySelector('#entry-film-poster');
var $entryFilmTitle = document.querySelector('#entry-film-title');
var $entryFilmYear = document.querySelector('#entry-film-year');
var $movieEntryForm = document.querySelector('#movie-entry-form');
var $userActionBanner = document.querySelector('.user-action-banner');
var $navBar = document.querySelector('.nav-bar');
var $navSearch = document.querySelector('#nav-search');
var $navDiary = document.querySelector('#nav-diary');
var $diaryContainer = document.querySelector('#diary-container');
var $editDeleteBtn = document.querySelector('#edit-delete-btn');
var $closeEditDelete = document.querySelector('#close-edit-delete');
var $editEntryBtn = document.querySelector('#edit-entry');

if (data.view === 'search-result') {
  renderSearchResult(data.lastSearch);
  changeView('search-result');
} else if (data.view === 'individual-entry') {
  createIndividualEntry(data.lastDiaryEntry);
  changeView('individual-entry');
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
  if (event.target.getAttribute('id') === 'close-entry-form') {
    for (var s = 0; s < $stars.length; s++) {
      $stars[s].className = 'fas fa-star form-star';
    }
    $heart.className = 'fas fa-heart';
    $rewatchContainer.className = 'row padding-tb-75-rem flex-column align-center pt-1-5rem grey-text';
  }
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
  if ($searchResultView.firstElementChild !== null) {
    $searchResultView.removeChild($searchResultView.firstElementChild);
  }

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
    addFilmToForm(data.lastSearch);
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

function addFilmToForm(film) {
  $entryFilmPoster.setAttribute('src', film.poster);
  $entryFilmTitle.textContent = film.title;
  $entryFilmYear.textContent = film.year;
  data.currentEntry.movie = film;
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
      $stars[i].className = 'fas fa-star form-star';
    }
    data.currentEntry.rating = 0;
  } else {
    for (i = 0; i < $stars.length; i++) {
      if (i < starIndex) {
        $stars[i].className = 'fas fa-star form-star rated';
      } else {
        $stars[i].className = 'fas fa-star form-star';
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

function formatDate(date) {
  var yearMonthDay = date.split('-');
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  data.currentEntry.formattedDate.year = parseInt(yearMonthDay[0]);
  data.currentEntry.formattedDate.day = parseInt(yearMonthDay[2]);
  data.currentEntry.formattedDate.month = parseInt(yearMonthDay[1]);
  data.currentEntry.formattedDate.fullMonth = months[data.currentEntry.formattedDate.month - 1];
  data.currentEntry.formattedDate.shortMonth = shortMonths[data.currentEntry.formattedDate.month - 1];

  var sortDate = new Date(data.currentEntry.formattedDate.month + '/' + data.currentEntry.formattedDate.day + '/' + data.currentEntry.formattedDate.year);
  data.currentEntry.sorting = sortDate.getTime();
}

function saveEntry(event) {
  event.preventDefault();
  data.currentEntry.date = $movieEntryForm.elements.date.value;
  formatDate(data.currentEntry.date);
  data.currentEntry.review = $movieEntryForm.elements.review.value;
  data.currentEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
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

function navToSwitchViews(event) {
  if (event.target.tagName !== 'I' && event.target.tagName !== 'A') {
    return;
  }

  var navItem = event.target.closest('.nav-button');
  var dataView = navItem.getAttribute('data-view');

  if (dataView === 'search-films') {
    changeView('search-films');
  } else {
    changeView('diary');
  }
  if (data.view === 'diary') {
    $navSearch.className = 'fas fa-search nav-item';
    $navDiary.className = 'fas fa-ticket-alt nav-item blue-text';
  } else {
    $navSearch.className = 'fas fa-search nav-item blue-text';
    $navDiary.className = 'fas fa-ticket-alt nav-item';
  }

}

$navBar.addEventListener('click', navToSwitchViews);

/* <div class="row diary-entry">
  <div class="entry-day justify-center align-center">
    <p class="font-weight-100 letter-spacing-point-1rem">19</p>
  </div>
  <div class="entry-pic">
    <img class="" src="https://m.media-amazon.com/images/M/MV5BOWI2YWQxM2MtY2U4Yi00YjgzLTgwNzktN2ExNTgzNTIzMmUzXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg" alt='movie poster'>
  </div>
  <div class="entry-info">
    <div class="row align-center diary-entry-mg">
      <p class="font-size-14 font-weight-700 no-margin">All the President's Men</p>
      <p class="font-size-12 grey-text margin-sides-4px">1976</p>
    </div>
    <div class="row font-size-12">
      <div>
        <i class="fas fa-star rated no-margin" data-index="1"></i>
        <i class="fas fa-star rated no-margin" data-index="2"></i>
        <i class="fas fa-star rated no-margin" data-index="3"></i>
        <i class="fas fa-star rated no-margin" data-index="4"></i>
        <i class="fas fa-star rated no-margin" data-index="5"></i>
      </div>
      <div>
        <i class="fas fa-heart liked margin-sides-4px"></i>
      </div>
      <div>
        <i class="fas fa-history light-blue-text font-size-12 margin-sides-4px"></i>
      </div>
    </div>
  </div>
</div>
<hr class="diary-entry-divider"></hr> */

function showRating(ratingContainer, entry) {
  for (var r = 0; r < ratingContainer.children.length; r++) {
    ratingContainer.children[r].className = 'fas fa-star rated no-margin hidden';
  }
  for (var s = 0; s < entry.rating; s++) {
    ratingContainer.children[s].className = 'fas fa-star rated no-margin';
  }
}

function showLike(heart, entry) {
  heart.className = 'fas fa-heart liked margin-sides-4px hidden';
  if (entry.liked === true) {
    heart.className = 'fas fa-heart liked margin-sides-4px';
  }
}

function showRewatch(rewatchIcon, entry) {
  if (entry.rewatched === true) {
    rewatchIcon.className = 'fas fa-history light-blue-text font-size-12 margin-sides-4px';
  }
}

function renderDiary(entry) {
  var $entryBlock = document.createElement('div');
  $entryBlock.setAttribute('data-year', entry.formattedDate.year);
  $entryBlock.setAttribute('data-month', entry.formattedDate.month);
  $entryBlock.setAttribute('data-full-month', entry.formattedDate.fullMonth);
  $entryBlock.setAttribute('data-view', 'individual-entry');
  $entryBlock.setAttribute('data-entry-id', entry.entryId);

  var $diaryEntry = document.createElement('div');
  $diaryEntry.className = 'row diary-entry';
  $entryBlock.appendChild($diaryEntry);

  var $entryDayContainer = document.createElement('div');
  $entryDayContainer.className = 'entry-day justify-center align-center';
  $diaryEntry.appendChild($entryDayContainer);

  var $entryDay = document.createElement('p');
  $entryDay.className = 'font-weight-100 letter-spacing-point-1rem';
  $entryDay.textContent = entry.formattedDate.day;
  $entryDayContainer.appendChild($entryDay);

  var $entryPicContainer = document.createElement('div');
  $entryPicContainer.className = 'entry-pic';
  $diaryEntry.appendChild($entryPicContainer);

  var $entryPic = document.createElement('img');
  $entryPic.setAttribute('alt', 'movie poster');
  $entryPic.setAttribute('src', entry.movie.poster);
  $entryPicContainer.appendChild($entryPic);

  var $entryInfo = document.createElement('div');
  $entryInfo.className = 'entry-info';
  $diaryEntry.appendChild($entryInfo);

  var $entryTitleYearContainer = document.createElement('div');
  $entryTitleYearContainer.className = 'row align-center diary-entry-mg';
  $entryInfo.appendChild($entryTitleYearContainer);

  var $entryTitle = document.createElement('p');
  $entryTitle.className = 'font-size-14 font-weight-700 no-margin';
  $entryTitle.textContent = entry.movie.title;
  $entryTitleYearContainer.appendChild($entryTitle);

  var $entryYear = document.createElement('p');
  $entryYear.className = 'font-size-12 grey-text margin-sides-4px';
  $entryYear.textContent = entry.movie.year;
  $entryTitleYearContainer.appendChild($entryYear);

  var $ratingsContainer = document.createElement('div');
  $ratingsContainer.className = 'row font-size-12';
  $entryInfo.appendChild($ratingsContainer);

  var $starRatingContainer = document.createElement('div');
  $ratingsContainer.appendChild($starRatingContainer);

  var $oneStar = document.createElement('i');
  $oneStar.className = 'fas fa-star rated no-margin hidden';
  $oneStar.setAttribute('data-index', '1');
  $starRatingContainer.appendChild($oneStar);

  var $twoStar = document.createElement('i');
  $twoStar.className = 'fas fa-star rated no-margin hidden';
  $twoStar.setAttribute('data-index', '2');
  $starRatingContainer.appendChild($twoStar);

  var $threeStar = document.createElement('i');
  $threeStar.className = 'fas fa-star rated no-margin hidden';
  $threeStar.setAttribute('data-index', '3');
  $starRatingContainer.appendChild($threeStar);

  var $fourStar = document.createElement('i');
  $fourStar.className = 'fas fa-star rated no-margin hidden';
  $fourStar.setAttribute('data-index', '4');
  $starRatingContainer.appendChild($fourStar);

  var $fiveStar = document.createElement('i');
  $fiveStar.className = 'fas fa-star rated no-margin hidden';
  $fiveStar.setAttribute('data-index', '5');
  $starRatingContainer.appendChild($fiveStar);

  showRating($starRatingContainer, entry);

  var $likeContainer = document.createElement('div');
  $ratingsContainer.appendChild($likeContainer);

  var $likedMovie = document.createElement('i');
  $likedMovie.className = 'fas fa-heart liked margin-sides-4px hidden';
  $likeContainer.appendChild($likedMovie);

  showLike($likedMovie, entry);

  var $watchAgainContainer = document.createElement('div');
  $ratingsContainer.appendChild($watchAgainContainer);

  var $watchedAgain = document.createElement('i');
  $watchedAgain.className = 'fas fa-history light-blue-text font-size-12 margin-sides-4px hidden';
  $watchAgainContainer.appendChild($watchedAgain);

  showRewatch($watchedAgain, entry);

  var $entryDivider = document.createElement('hr');
  $entryDivider.className = 'diary-entry-divider';
  $entryBlock.appendChild($entryDivider);

  $entryBlock.addEventListener('click', function () {
    createIndividualEntry(parseInt($entryBlock.getAttribute('data-entry-id')));
    changeView('individual-entry');
    data.lastDiaryEntry = parseInt($entryBlock.getAttribute('data-entry-id'));
  });

  return $entryBlock;
}

function addMonthToYear(month) {
  var $years = document.querySelectorAll('.year');
  for (var y = 0; y < $years.length; y++) {
    var currentYear = $years[y].getAttribute('data-year');
    if (month.getAttribute('data-year') === currentYear) {
      $years[y].appendChild(month);
      return $years[y];
    }
  }
  var $yearContainer = document.createElement('div');
  $yearContainer.className = 'year';
  $yearContainer.setAttribute('data-year', month.getAttribute('data-year'));
  $yearContainer.appendChild(month);
  return $yearContainer;
}

/* <div class="row month-header align-center">
  <p class="grey-text font-size-14 all-caps letter-spacing-point-1rem">September 2021</p>
</div> */

function addEntryToMonth(entry) {
  var $months = document.querySelectorAll('.month');
  for (var m = 0; m < $months.length; m++) {
    var currentMonth = $months[m].getAttribute('data-month');
    var currentYearOfMonth = $months[m].getAttribute('data-year');
    if (entry.getAttribute('data-month') === currentMonth && entry.getAttribute('data-year') === currentYearOfMonth) {
      $months[m].appendChild(entry);
      return $months[m];
    }
  }
  var $monthContainer = document.createElement('div');
  $monthContainer.className = 'month';
  $monthContainer.setAttribute('data-month', entry.getAttribute('data-month'));
  $monthContainer.setAttribute('data-year', entry.getAttribute('data-year'));

  var $monthHeader = document.createElement('div');
  $monthHeader.className = 'row month-header align-center';
  $monthContainer.appendChild($monthHeader);

  var $monthYearText = document.createElement('p');
  $monthYearText.className = 'grey-text font-size-14 all-caps letter-spacing-point-1rem';
  $monthYearText.textContent = entry.getAttribute('data-full-month') + ' ' + entry.getAttribute('data-year');
  $monthHeader.appendChild($monthYearText);

  $monthContainer.appendChild(entry);

  return $monthContainer;
}

function loadDiaryEntries(event) {
  for (var i = 0; i < data.sortedEntries.length; i++) {
    var entryMonth = addEntryToMonth(renderDiary(data.sortedEntries[i]));
    var entryYear = addMonthToYear(entryMonth);
    $diaryContainer.appendChild(entryYear);
  }
}

document.addEventListener('DOMContentLoaded', loadDiaryEntries);

function createIndividualEntry(entryId) {

  function ieToSearchResult(movie) {
    renderSearchResult(movie);
    changeView('search-result');
  }

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      var $iePoster = document.querySelector('#ie-poster');
      $iePoster.setAttribute('src', data.entries[i].movie.poster);

      var $ieTitle = document.querySelector('#ie-title');
      $ieTitle.textContent = data.entries[i].movie.title;

      var $ieYear = document.querySelector('#ie-year');
      $ieYear.textContent = data.entries[i].movie.year;

      var $ieDate = document.querySelector('#ie-date');
      $ieDate.textContent = data.entries[i].formattedDate.shortMonth + ' ' + data.entries[i].formattedDate.day + ', ' + data.entries[i].formattedDate.year;

      var $ieRewatch = document.querySelector('#ie-rewatch');
      if (data.entries[i].rewatched === true) {
        $ieRewatch.textContent = 'Rewatched';
      } else {
        $ieRewatch.textContent = 'Watched';
      }

      var $ieRating = document.querySelector('#ie-rating');

      showRating($ieRating, data.entries[i]);

      var $ieLike = document.querySelector('#ie-like');

      showLike($ieLike, data.entries[i]);

      var $ieReview = document.querySelector('#ie-review');
      $ieReview.textContent = data.entries[i].review;

      var $backToDiary = document.querySelector('#back-to-diary');
      $backToDiary.addEventListener('click', function () {
        changeView('diary');
      });

      var $entryToSearchLink = document.querySelector('#entry-to-search-link');

      var entryMovie = data.entries[i].movie;

      $entryToSearchLink.addEventListener('click', function () {
        ieToSearchResult(entryMovie);
      });
    }
  }
}

function toggleEditDeleteModal(event) {
  toggleModals('edit-delete');
}

$editDeleteBtn.addEventListener('click', toggleEditDeleteModal);
$closeEditDelete.addEventListener('click', toggleEditDeleteModal);

function showEditEntry(event) {
  toggleModals('edit-delete');
  toggleModals('entry-form');
  var editedEntryId = data.lastDiaryEntry;
  var $currentIndividualEntry = document.querySelector('#individual-entry-view');
  data.editing = $currentIndividualEntry.firstElementChild;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === editedEntryId) {
      addFilmToForm(data.entries[i].movie);
      $movieEntryForm.elements.date.value = data.entries[i].date;
      $movieEntryForm.elements.review.value = data.entries[i].review;
      for (var currentStar = 0; currentStar < data.entries[i].rating; currentStar++) {
        $starsContainer.children[currentStar].className = 'fas fa-star form-star rated';
      }
      if (data.entries[i].liked === true) {
        $heart.className = 'fas fa-heart liked';
      }
      if (data.entries[i].rewatched === true) {
        $rewatchContainer.className = 'row padding-tb-75-rem flex-column align-center pt-1-5rem light-blue-text';
      }
    }
  }
}

$editEntryBtn.addEventListener('click', showEditEntry);
