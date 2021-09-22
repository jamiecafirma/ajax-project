var $openIMDB = document.querySelector('#open-imdb');
var $closeIMDB = document.querySelector('#close-imdb');
var $modals = document.querySelectorAll('.modal');
var $titleForm = document.querySelector('#search-movie-title');
var $idForm = document.querySelector('#search-id');
var apikey = 'apikey=9de878f5';

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

function searchTitle(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  var searchTitle = $titleForm.title.value;
  var searchYear = $titleForm.year.value;
  var movieEntry = {};

  console.log(searchTitle, searchYear);

  if (searchYear !== '') {
    xhr.open('GET', 'http://www.omdbapi.com/?t=' + searchTitle + '&' + 'y=' + searchYear + '&' + 'plot=full' + '&' + apikey);
  } else {
    xhr.open('GET', 'http://www.omdbapi.com/?t=' + searchTitle + '&' + 'plot=full' + '&' + apikey);
  }
  xhr.responseType = 'json';

  function renderEntries() {
    console.log(xhr.status);
    console.log(xhr.response);
    movieEntry.title = xhr.response.Title;
    movieEntry.year = xhr.response.Year;
    movieEntry.director = xhr.response.Director;
    movieEntry.writer = xhr.response.Writer;
    movieEntry.cast = xhr.response.Actors;
    movieEntry.plot = xhr.response.Plot;
    movieEntry.imdbID = xhr.response.imdbID;
    movieEntry.poster = xhr.response.Poster;

    console.log(movieEntry);
  }

  xhr.addEventListener('load', renderEntries);
  xhr.send();

}

$titleForm.addEventListener('submit', searchTitle);
