/* exported data */

var data = {
  modal: {
    open: false,
    current: 'imdb'
  },
  view: 'search-films',
  lastSearch: {},
  lastDiaryEntry: null,
  editing: null,
  beforeEditing: {},
  nextEntryId: 1,
  entries: [],
  sortedEntries: [],
  currentEntry: {
    rating: 0,
    liked: false,
    rewatched: false,
    review: '',
    date: '',
    formattedDate: {
      year: 0,
      day: 0,
      month: 0,
      fullMonth: '',
      shortMonth: ''
    },
    sorting: 0,
    movie: {},
    entryId: 0
  }
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

function sortEntriesByWatchDate(entries) {
  var newestFirst = entries;
  newestFirst.sort(function (a, b) {
    return b.sorting - a.sorting;
  });
  return newestFirst;
}

data.sortedEntries = sortEntriesByWatchDate(data.entries);
