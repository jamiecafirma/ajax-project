/* exported data */

var data = {
  modal: {
    open: false,
    current: 'imdb'
  },
  view: 'search-film',
  lastSearch: {},
  entries: []
};

var previousDataJSON = localStorage.getItem('movie-diary-entries');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function addLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('movie-diary-entries', dataJSON);
}

window.addEventListener('beforeunload', addLocalStorage);
